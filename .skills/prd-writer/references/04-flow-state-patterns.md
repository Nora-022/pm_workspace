# Flow & State Patterns (流程与状态模式库)

目标：提供可复用状态机片段，减少“漏异常流”。

## Pattern A: URL 解析与下载（Stream 类）

状态建议：
`Idle -> Parsing -> Ready -> Downloading -> Completed`
异常分支：
- ParsingFailed（链接无效/不支持）
- QuotaBlocked（配额触发）
- NetworkInterrupted（断网暂停，可续传）
- StorageInsufficient（空间不足）

## Pattern B: 光盘读取与转换（DVDFab 类）

状态建议：
`DiscDetected -> Scanning -> ProfileSelected -> Converting -> OutputReady`
异常分支：
- DriveNotFound
- DiscUnsupported
- ReadError
- EncodeFailure

## Pattern C: AI 增强任务（UniFab 类）

状态建议：
`Queued -> Precheck -> Enhancing -> Rendering -> Exported`
异常分支：
- ModelUnavailable
- VRAMInsufficient
- ParameterInvalid
- RenderTimeout

## Pattern D: 录制任务（RecordFab 类）

状态建议：
`Ready -> Recording -> Segmenting -> Finalizing -> Saved`
异常分支：
- SourceBlocked
- CaptureInterrupted
- DRMProtectedContent

## Pattern E: 本地播放与媒体库（PlayerFab 类）

状态建议：
`Indexing -> Playable -> Playing -> Paused -> Stopped`
异常分支：
- DecoderUnavailable
- SubtitleLoadFailed
- MetadataMismatch

## PRD 写作提示

- 每个流程至少写 1 条成功流 + 2 条异常流。
- 明确“失败后是否可恢复、如何恢复、是否丢进度”。
- 涉及长任务时，必须给用户可见进度与可取消行为。
