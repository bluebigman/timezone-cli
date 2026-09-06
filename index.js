#!/usr/bin/env node
function out(ok, data, error) { process.stdout.write(JSON.stringify(ok ? { code: 0, ok: true, data } : { code: 1, ok: false, error }) + '\n'); }
const args = process.argv.slice(2); const cmd = args[0] || '';
const CITIES = { beijing: 'Asia/Shanghai', shanghai: 'Asia/Shanghai', tokyo: 'Asia/Tokyo', newyork: 'America/New_York', london: 'Europe/London', paris: 'Europe/Paris', singapore: 'Asia/Singapore', sydney: 'Australia/Sydney', dubai: 'Asia/Dubai', losangeles: 'America/Los_Angeles', sanfrancisco: 'America/Los_Angeles', seoul: 'Asia/Seoul', hongkong: 'Asia/Hong_Kong', berlin: 'Europe/Berlin' };
function tzNow(tz) { try { return new Intl.DateTimeFormat('zh-CN', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()); } catch (e) { return null; } }
try {
  if (cmd === 'status' || cmd === 'auth') return out(true, { ok: 'timezone ready' });
  if (cmd === 'cities') return out(true, { cities: Object.keys(CITIES) });
  if (cmd === 'now') { const key = (args[1] || 'beijing').toLowerCase().replace(/[\s_-]/g, ''); const tz = CITIES[key]; if (!tz) return out(false, null, '城市未知，可用: ' + Object.keys(CITIES).join('/')); return out(true, { city: key, tz, localTime: tzNow(tz) }); }
  if (cmd === 'compare') { const outL = {}; (args.slice(1).length ? args.slice(1) : ['beijing', 'london', 'newyork']).forEach(k => { const key = k.toLowerCase().replace(/[\s_-]/g, ''); const tz = CITIES[key]; if (tz) outL[key] = tzNow(tz); }); return out(true, { times: outL }); }
  if (cmd === 'stamp') { const t = args[1] ? new Date(args.slice(1).join(' ')) : new Date(); if (isNaN(t)) return out(false, null, '时间格式无效'); return out(true, { timestamp: Math.floor(t.getTime() / 1000), iso: t.toISOString(), local: t.toString() }); }
  if (cmd === 'fromstamp') { const sec = parseInt(args[1]); if (isNaN(sec)) return out(false, null, '缺少时间戳'); return out(true, { iso: new Date(sec * 1000).toISOString(), local: new Date(sec * 1000).toString() }); }
  return out(false, null, '未知命令。支持: status/auth/cities/now/compare/stamp/fromstamp');
} catch (e) { out(false, null, '执行错误: ' + e.message); }
