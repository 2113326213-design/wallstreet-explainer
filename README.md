# wallstreet-explainer

有一类财经视频，画面高级、简约，又有质感。这种风格怎么做呢？我做了一个 Skill，可以直接生成这种视频。

![样片：《AI 到底有多烧钱》](examples/ai-burn-money/sample.gif)

这个就是用这个 Skill 打磨出来的样片《AI 到底有多烧钱》，77 秒，这里压成了没有声音的 GIF。片子里的实拍、人物和新闻截图都是引用的，出处在 [CREDITS.md](examples/ai-burn-money/CREDITS.md)。

## 先说画面

这类财经视频，画面全是真实素材：新闻发布会、产品发布、企业官方画面，然后把数字和关系用可视化的方式表达出来。

所以最核心的就两件事：素材和数字表达。

素材的选择非常重要。这个 Skill 里面明确规定了素材的优先级，它会自己去各大主流视频网站上找到合适的片段，裁剪、处理。片子里的人也是真人，从发布会、采访里一帧一帧抠出来，站在大字前面讲。

数字表达就是 B-roll 的重点。数据怎么放、关系怎么画、图表怎么呈现，这些控制了整个片子的风格。

![四个镜头动作的连续帧](examples/ai-burn-money/moves_v6.jpg)

上面是样片里四个镜头动作，从上往下：镜头沿着桌上的新闻滑过去；黄仁勋从发布会画面里抠出来，身后换成"5.2 万亿"；整组横推出去换成 Altman；新闻原文倒下去变成桌面，图表立起来。

## 镜头和转场

然后是镜头之间的连贯性和转场。

这种财经视频最重要的是克制。同一个对象可以挂镜头运动，不是每出现一个新东西就切一下。不要为了有变化就去换机位、换背景，也不要连续硬切好几次让观众重新找位置。所有 PPT 式的渐入渐出，全部排除。

背景的质感、字体、节奏，也都是风格的一部分。

整个片子是用代码一帧一帧画出来的，通过时间线编排，最后渲染成视频。配乐用平稳的底乐，人声出来的时候自动压低，再加一些经典的财经类音效。

## 这套风格是怎么来的

这套风格是参考这类财经视频提取出来的：一个问题就能撑起全篇，开头五到七秒抛出反差，结尾回答它，形成一句判断。

图形有自己的表达任务，实拍以直接切为主，新闻和报告给出具体截图，用高亮标出来。

色调、字体、节奏，都是复刻出来的。

## 每一镜都要回答

这个 Skill 在设计的时候，每一镜都要回答：内容有没有增量？镜头有没有承接？素材是不是真实、高清、官方的？数字有没有表达清楚？

交付前静音看一遍，画面本身就能讲清楚在说什么。

小字不要太多，太多就 AI 味了。

## 怎么用

用法很简单：把这个 Skill 的链接发给你的 AI 工具，让它下载、导入，然后直接生成视频就行了。

用 Claude Code 的话，自己装也就几行：

```bash
git clone https://github.com/HeyChengC/wallstreet-explainer.git ~/.claude/skills/wallstreet-explainer
cd ~/.claude/skills/wallstreet-explainer
pip install -r requirements.txt
npm install && npx playwright install chromium
```

再装一个 ffmpeg，放进 PATH。装完重启 Claude Code，跟它说"用 wallstreet-explainer 做一条 1 分钟的片子，讲 AI 到底有多烧钱"就行。

选题可以自己选，文案可以自己给，也可以让它来出。开头会让你选一个钩子，财经风格的钩子很重要，你可以自己描述想要什么，也可以让 AI 给你准备几个，自己挑。

配音一开始用免费的 edge-tts 临时配，先把时间线排出来。文案和画面都定了，再换成你自己的配音：每句存成 `voice/<句子id>.final.wav`，跑一下 `python scripts/temp_voice.py film/script.json --asr`，画面会跟着重新对齐。

几个可能会碰到的问题：

- yt-dlp 和 edge-tts 隔一阵会被 403，`pip install -U` 一下就好。
- 抠人要装 `onnxruntime-gpu`（有 N 卡）或者 `onnxruntime`，再用 rembg 把模型下下来：`python -c "from rembg import new_session; new_session('isnet-general-use')"`。
- 换配音以后逐字对齐要 faster-whisper，有 N 卡快很多。
- 字体不随仓库给，要自己下：字幕 MiSans，标签和片名阿里妈妈数黑体，大数字 Bebas Neue，兜底 Noto Sans SC。字幕里的英文和数字我用的 Century Gothic Italic，这个是商业字体，可以换成 URW Gothic 或者 Questrial。
- Playwright 装在别的地方，设个环境变量 `PLAYWRIGHT_FROM` 指过去就行。

## 里面有什么

`SKILL.md` 是 AI 读的入口，具体的东西都在 `references/` 里：每一镜怎么想（`thinking.md`）、镜头怎么动才不像 PPT（`motion.md`）、画面和转场（`style.md`、`grammar.md`）、开头的钩子（`opening.md`）、找素材和声音（`sourcing.md`、`audio.md`）、交付前查什么、踩过哪些坑（`review.md`、`lessons.md`）。

`scripts/` 里是做片要用的工具：

| 脚本 | 干什么 |
|---|---|
| `footage.py` | 搜片、下片（可以只下一段）、拼联系表、找切点、抽帧、看原声剪口 |
| `snap_news.mjs` | 截新闻原文，量出关键词的位置，用来画高亮 |
| `temp_voice.py` | 临时配音和时间线，换正式配音后重新对齐 |
| `matte.py`、`matte_clean.py` | 把视频里的人一帧一帧抠出来 |
| `stage25d.js` | 镜头、景深、运动模糊、大字这些小工具 |
| `render.mjs` | 一帧一帧渲染成视频 |
| `strip.py` | 把一个镜头动作拼成连续帧，看有没有穿帮 |
| `motion_check.py` | 量一下画面是不是太"死" |
| `mix.py` | 配音、原声、音效、配乐混在一起 |

`examples/ai-burn-money/` 是样片的文案、导演表，还有每一段为什么这么拍。

## 素材和版权

这类片子一定会用到别人的素材：企业宣传片、新闻画面、网页截图、当事人原声。只拿来做评论和解读，每条片都在简介里写清楚出处，写法可以参考 [CREDITS.md](examples/ai-burn-money/CREDITS.md)。有没有风险，你自己判断。

新闻网页截不到的时候，可以用核实过的文字自己排一张图，但别仿真实网站的 logo 和版式，也别编数据。别拿真实博主、电影、品牌的名字给自己的片子起名。

## License

代码和文档是 MIT，见 [LICENSE](LICENSE)。样片里的第三方画面、截图、logo 和人物不在 MIT 范围内，归各自的所有者。
