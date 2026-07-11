# 机械结构实习作品集网站

纯静态个人作品集网站，专为机械工程专业学生设计，适合向 HR 展示个人技能和项目经历。

## 技术特点

- **零依赖**：纯 HTML + CSS + JavaScript，无需安装任何工具
- **响应式**：适配桌面、平板、手机
- **快速部署**：可直接用 GitHub Pages 托管
- **简洁专业**：清晰的设计，突出内容本身

## 快速开始

### 本地预览

直接在浏览器中打开 `index.html` 即可。

或者在项目目录下启动一个本地服务器：

```bash
# Python 3
python -m http.server 8080

# 然后在浏览器打开 http://localhost:8080
```

### 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库（例如 `portfolio`）
2. 将本目录下的文件推送到仓库：

```bash
cd portfolio
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/portfolio.git
git branch -M main
git push -u origin main
```

3. 在仓库的 **Settings → Pages** 中：
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`，文件夹选择 `/ (root)`
   - 点击 Save

4. 等待几分钟，网站将在 `https://你的用户名.github.io/portfolio` 上线。

### 绑定自定义域名

1. 在 `Settings → Pages → Custom domain` 中填入你的域名
2. 在你的域名 DNS 中添加一条 CNAME 记录指向 `你的用户名.github.io`
3. 勾选 `Enforce HTTPS`

## 自定义内容

### 需要替换的内容（按优先级）

所有内容在 `index.html` 文件中，搜索 `TODO` 即可定位：

| 优先级 | 内容 | 位置 |
|--------|------|------|
| ⭐⭐⭐ | 姓名、学校、专业 | Hero、关于我、页脚 |
| ⭐⭐⭐ | ROBOCON 实际经历 | 赛事经历区块 |
| ⭐⭐⭐ | 邮箱、电话等联系方式 | 联系方式区块 |
| ⭐⭐ | 技能及其熟练度 | 技能专长区块 |
| ⭐⭐ | 项目名称和描述 | 项目作品 + `js/main.js` 中的 projectDetails |
| ⭐ | GitHub/LinkedIn 链接 | 联系方式 |
| ⭐ | 简历 PDF 文件 | 联系方式（放置 `images/resume.pdf`）|

### 替换图片

将你的图片放入 `images/` 目录，然后更新对应的路径：

- **个人照片**：`index.html` 中「关于我」区块，替换占位 div 为 `<img>` 标签
- **项目图片**：`index.html` 中项目卡片，替换占位 div
- **比赛照片**：`index.html` 中赛事经历，取消注释 img 标签
- **简历 PDF**：放置为 `images/resume.pdf`

建议图片尺寸：
- 个人照片：400×500px
- 项目缩略图：800×500px
- 比赛照片：800×450px

### 修改配色

在 `css/style.css` 开头的 `:root` 中修改 CSS 变量：

```css
--color-accent: #2563eb;       /* 主色调 */
--color-accent-dark: #1d4ed8;  /* 深色变体 */
--color-accent-light: #eff6ff; /* 浅色变体 */
```

## 文件结构

```
portfolio/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式表
├── js/
│   └── main.js         # 交互逻辑 + 项目详情数据
├── images/             # 图片和简历
│   ├── photo.jpg       # 个人照片（待添加）
│   ├── resume.pdf      # 简历 PDF（待添加）
│   └── ...             # 项目/比赛图片（待添加）
└── README.md           # 本文件
```

## 浏览器兼容

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## License

MIT — 随意使用和修改。
