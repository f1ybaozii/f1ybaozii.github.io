# Chenkan Wang · 王晨侃

采用 [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) 模板的中英文学术个人主页，参考 [Jiale Ma 的主页](https://heatingma.github.io/) 的栏目组织。页面采用顶部导航、左侧个人资料和右侧学术内容布局，包含教育经历、荣誉、论文、开源项目、技能与语言能力。

## 预览与构建

环境要求：Node.js 20.19 或更新的受支持版本，以及 npm。

```sh
npm install
npm run build
npm run preview
```

浏览器访问 http://127.0.0.1:4173/，中文页面为 http://127.0.0.1:4173/zh.html。预览服务只监听本机，按 Ctrl+C 关闭。

仓库根目录中的 `index.html` 和 `zh.html` 是生成后的完整静态页面，可以直接用浏览器打开。生成后的站点支持 GitHub Pages 根目录发布。

## 修改个人资料

`data/resume.json` 集中维护中英文资料：

- 顶层字段：邮箱、GitHub、站点地址、照片和技能列表。
- `locales.en` 与 `locales.zh`：姓名、学校、介绍、教育、荣誉、论文、项目与语言成绩。可选的 `researchInterests` 数组用于在侧栏展示研究方向。
- 论文中的 `title`、`venue`、`date`、`description` 和 `detailsHtml` 分别控制标题、发表状态与作者角色、日期、简介及详情。可选 `url` 字段用于论文链接。
- 可选的 `codeUrl` 字段用于在论文条目中直接展示 GitHub 图标与仓库地址链接，与开源项目使用相同的链接格式。
- 论文的 `status` 使用 `accepted` 或 `under-review`，页面自动分成 Accepted 和 Under Review 两个子模块，同类条目沿用资料文件中的顺序。
- 英文版使用论文原文的正式英文标题，中文版使用对应中文标题；Accepted 当前顺序为 P4casting、AURORA、AdaTable。
- 可选的 `image` 包含 `src`、`alt`、`width` 和 `height`，用于展示论文原图缩略图，点击可在页面内放大，支持关闭按钮、Esc 和点击遮罩关闭。图片存放在 `assets/papers/`。
- 项目中的 `url` 指向项目仓库，仓库链接直接显示在项目标题下方；`detailsHtml` 保留完整工作内容。

修改资料后运行 `npm run build`，将资料文件、生成的 HTML 和 CSS 一起提交。新增论文时同步维护对应的中英文信息。

## 目录结构

```text
data/resume.json             个人资料
src/render.mjs              共用栏目与内容生成
src/site.scss               本站样式及响应式适配
src/theme/acadhomepage/     AcadHomepage 模板、原始样式与许可
src/preview.mjs             本地静态预览服务
scripts/build.mjs           构建入口
scripts/preview.mjs         预览入口
assets/homepage.css         生成后的完整样式
assets/homepage.js          手机菜单、栏目定位、配图放大和打印
assets/favicon.svg          站点图标
images/photo.jpg            个人照片
index.html                  英文页面
zh.html                     中文页面
```

顶部导航自动标记当前栏目；手机上可展开菜单。论文与项目详情使用原生可展开组件。语言切换和详情阅读支持静态访问，打印按钮可以调用浏览器打印或保存为 PDF。

论文和开源项目不展示起止时间，教育经历保留时间信息。

## GitHub Pages

在 `f1ybaozii.github.io` 仓库 Settings → Pages 中，选择从所用分支的根目录发布。提交的根目录已包含构建产物和 `.nojekyll`，线上直接提供静态文件。

默认语言为英文，中文页面地址为 `/zh.html`。站点地址在 `data/resume.json` 的 `website` 中设置。

## 模板与许可

模板来源为 [RayeRen/AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io)，采用 MIT 许可，许可文件见 `LICENSE`。原始 Sass 和布局来源、导入版本及适配说明见 `src/theme/acadhomepage/README.md`。

本站通过 Sass 和 LiquidJS 构建模板，页面使用系统字体和内联 SVG 图标，个人资料与照片来自本项目。

论文配图取自原稿：P4casting 使用 `Figures/overview.pdf`，AURORA 使用 `overview_v2.png`，AdaTable 使用用户提供的原始 PNG 架构图，RecPipe 使用第 3 页 Figure 1，Granulaxis 使用第 4 页 Fig. 2。图中内容保留原样，仅提取图幅并转换为网页图片；AdaTable 的 PNG 原图直接用于展示。
