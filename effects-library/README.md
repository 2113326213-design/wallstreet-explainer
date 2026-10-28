# 免费商用视频效果库

本库提供可按时间控制的动态效果，用于 HTML、WebGL 与基于浏览器的影片制作。它们不是可以直接拖入任意剪辑软件的视频片段。使用前先预览并确认画面、风格和许可证。

## 图形和文字动画：162 个

`visual-effects/animations/预览动画效果.html` 可离线筛选、播放并拖动进度。包含 Animate.css 4.1.1 的 97 个动画，以及 Magic CSS 1.4.8 的 65 个动画；均采用 MIT 许可证，许可证原文分别保存在同一文件夹。名称相同与否按两套库的独立效果统计。

用于现有影片逐帧渲染时，不能只启动普通 CSS 动画再等待。先把 `animate.css`、`magic.css`、`fx-motion.js` 拷到影片目录并在影片 HTML 中加载；在每帧 `shot` 中将计算出的相对时间传入：

```js
const style = FXMotion.style('fadeIn', t - start, 1.0, 'animate');
return `<div style="${style}">标题</div>`;
```

第四个参数可为 `animate` 或 `magic`。必须加载对应 CSS 才能看到效果。选择并测试特效是否符合你的影片风格；原项目强调克制，应避免无目的地堆叠动画。

## 两画面转场：125 个

`visual-effects/transitions/index.html` 提供离线预览；每个转场包括作者、许可、参数与 GLSL 源码。125 项分别是 123 个 MIT、一个 BSD 2-Clause、一个 BSD 3-Clause；保留原始条款和版权声明。适配器可将两张已加载的图片按指定的进度计算成每一帧，详见 `visual-effects/transitions/README.md`。两个转场还需要额外的辅助贴图。

## 来源与授权

- Animate.css 4.1.1，MIT；此处只对随包提供的 4.1.1 版本作授权说明：https://github.com/animate-css/animate.css
- Magic CSS 1.4.8，MIT：https://github.com/miniMAC/magic
- GL Transitions 2.0.0，按各个转场的源码头部 MIT / BSD 条款：https://github.com/gl-transitions/gl-transitions

允许商用不等于不用遵守条件：保留随包的许可证、版权声明及各转场作者和源码声明。素材不代表任何来源方对你的项目提供背书。

## 安装

从 GitHub 下载 `video-effects.zip`，在影片项目目录解压得到 `visual-effects`；或使用此项目电脑副本中已解压的文件夹。两种预览页面离线可用；完整素材随压缩包保存。
