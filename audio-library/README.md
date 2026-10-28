# 免费音效与配乐

本目录收录适合财经解读视频的素材。音效来自 [Wyzowl SFX Kit](https://github.com/wyzowl/sfx-kit)，作者标明为 CC0 1.0，可免费用于商业及非商业作品并分享；音频并非本项目 MIT 代码许可证的一部分。以下用途是选片建议，制作时请试听并根据画面调整音量。

## 音效

| 文件 | 建议用途 | 同步点（秒） |
| --- | --- | ---: |
| `whoosh-fast-medium.wav` | A quick, clean swish of air with a defined middle. | 0.096 |
| `whoosh-fast-soft.wav` | A quick, gentle puff of air with a soft edge and no weight. | 0.099 |
| `whoosh-medium-soft.wav` | A smooth, gentle sweep of air that rises and fades without an edge. | 0.229 |
| `whoosh-slow-soft.wav` | A long, soft breath of air drifting past. | 0.452 |
| `reverse-whoosh-medium-soft.wav` | A soft reverse whoosh: air drawn in, building to a sudden stop. | 0.679 |
| `impact-deep-firm.wav` | A deep, booming knock: a big object landing on a wooden stage. | 0.01 |
| `impact-deep-soft.wav` | A deep, bass-heavy thud: something big landing on something soft. | 0.045 |
| `impact-medium-soft.wav` | A soft, padded thud: something landing on fabric. | 0.013 |
| `props-page-turn.wav` | A page turning: lifted at the corner, swung over and falling flat. | 0 |
| `data-bar-grow.wav` | A quick upward swish that lands on a tick: a bar growing to its value. | 0.328 |
| `data-chart-reveal.wav` | A soft swell with a few glints: a chart appearing. | 0.007 |
| `data-countup-medium.wav` | A count-up of about 1.2 seconds: ticks that speed up and settle. | 0 |
| `data-countup-short.wav` | A short count-up: ticks that speed up and settle, about 0.6 seconds. | 0 |
| `data-number-land.wav` | A woody knock with a small, bright ping: a number landing. | 0.011 |

同步点是音效中对应画面动作的时刻。若动作发生在 3 秒，音效同步点为 0.1 秒，则从 2.9 秒开始播放；`mix.py` 的 `t` 或 `at` 是音效开始时刻，需用 `shift` 减去同步点。音效建议按画面动作选用，避免与人声争抢。

## 配乐

| 文件 | 作者与来源 | 说明 |
| --- | --- | --- |
| `ambienttrack_1.ogg` | [annandistance](https://opengameart.org/content/feel-good-slow-ambient-track-with-a-beat) | CC0，缓慢节奏的氛围音乐 |
| `calm_theme.ogg` | [pebonius](https://opengameart.org/content/calm-music-0) | CC0，平静主题音乐 |
| `somnium.mp3` | [Adiutorium](https://opengameart.org/content/somnium) | CC0，氛围音乐 |

这些曲目依据来源页面标注为 CC0。混音时以人声清晰为先；不同片子的风格和平台审核结果仍需实际试听和检查。

## 混音示例

当 film 与 audio-library 位于同一个项目根目录时，可在 `film/sfx.json` 中使用：

```json
{
  "dir": "../audio-library",
  "bed": {"file": "ambienttrack_1.ogg", "gain": -13, "from_pre": true},
  "events": [
    {"file": "whoosh-fast-soft.wav", "t": 2.9, "peak": -20},
    {"file": "impact-deep-soft.wav", "t": 4.0, "peak": -18}
  ]
}
```

运行 `python scripts/mix.py film --check`；需要先安装 ffmpeg 和项目依赖。具体时间、响度与选曲应按成片调整。
