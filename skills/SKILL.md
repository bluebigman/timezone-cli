# 时区时间助手（timezone-cli）

常用城市当前时间/多城市对比/时间戳转换（含北京时间）。本地计算不联网。

本工具仅做本地数据/文本处理，不采集任何个人信息。

## 命令
| 命令 | 用途 |
|---|---|
| `timezone status` | 自检（返回含 ok） |
| `timezone auth` | 校验可用（本地工具无需密钥） |
| `timezone unAuth` | 清除本地状态 |
| `timezone cities` | 支持的城市列表 |
| `timezone now <城市>` | 城市当前时间，如 now beijing |
| `timezone compare <城市1> <城市2> …` | 多城市同时刻对比 |
| `timezone stamp [时间]` | 时间→时间戳 |
| `timezone fromstamp <时间戳>` | 时间戳→时间 |

所有命令输出 JSON：`{"code":0|1,"ok":true|false,"data":...,"error":"人类可读错误"}`。

## AI 使用指引
问"现在几点/时间戳" → now/fromstamp；多城市对比用 compare。
