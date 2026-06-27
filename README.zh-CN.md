# linxaura

> 一个集博客与相册于一体的个人站点。

## 项目结构

```
linxaura/
├── docs/                # VuePress 博客内容
│   └── .vuepress/
│       ├── config.ts    # VuePress 配置
│       └── public/      # 静态资源
│           └── gallery-app/  # Afilmory 相册构建产物 (gitignore)
├── afilmory/            # Afilmory 相册项目（pnpm monorepo）
│   ├── apps/web/        # 相册 SPA (Vite + React)
│   ├── packages/        # 共享包
│   └── locales/         # 国际化
├── package.json         # 博客项目配置
└── README.md
```

- **博客**：基于 VuePress + vuepress-theme-plume 构建，支持 Markdown 写作、标签、归档、友链
- **相册**：基于 Afilmory，支持照片网格、灯箱、EXIF 信息（相机、镜头、光圈、快门、ISO、GPS）、地图视图

## 前置要求

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 10（相册项目使用 pnpm workspace）

## 安装

```sh
# 安装博客依赖
npm install

# 安装相册依赖
cd afilmory && pnpm install && cd ..
```

## 开发

一条命令同时启动博客和相册：

```sh
npm run dev
```

- 博客开发服务：`http://localhost:8080`
- 相册开发服务：`http://localhost:13333`（通过 iframe 嵌入博客的 Gallery 页面）
- 单独启动博客：`npm run docs:dev`
- 单独启动相册：`npm run dev:gallery`

## 构建

```sh
npm run build
```

构建流程：
1. `build:gallery` — 构建 Afilmory SPA（`vite build --base /gallery-app/`）
2. `copy:gallery` — 将构建产物复制到 `docs/.vuepress/public/gallery-app/`
3. `docs:build` — 构建 VuePress 博客

最终产物在 `docs/.vuepress/dist/`，可直接部署到任何静态托管。

## 本地预览

```sh
npm run docs:preview
```

## 部署到服务器

### 推荐方案：Nginx 静态文件服务

```sh
# 1. 服务器上克隆项目
git clone <your-repo-url> linxaura
cd linxaura

# 2. 安装依赖
npm install
cd afilmory && pnpm install && cd ..

# 3. 构建
npm run build

# 4. Nginx 指向 docs/.vuepress/dist/
```

Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/linxaura/docs/.vuepress/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /gallery-app/assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 自动部署

可以在服务器上配置 webhook 或定时任务自动拉取并构建：

```sh
#!/bin/bash
# deploy.sh
cd /path/to/linxaura
git pull
npm install
cd afilmory && pnpm install && cd ..
npm run build
```

## 照片管理

相册依赖 Afilmory 的 builder 管线处理照片：

```sh
# 1. 将照片放入 afilmory/apps/web/public/photos/ 目录
#    （支持子目录，builder 会递归扫描）

# 2. 运行 builder 生成照片清单和缩略图
cd afilmory
pnpm build:manifest

# 3. 如需强制重建（重新处理所有照片）
pnpm build:manifest -- --force
```

Builder 会：
- 扫描 `photos/` 目录，提取 EXIF 信息（相机、镜头、GPS 等）
- 生成多尺寸缩略图 + 模糊占位符
- 写入 `apps/web/src/data/photos-manifest.json`

如果在服务器上没有照片源，可以使用本地已有的 manifest 直接部署。

## 文档

- [VuePress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
- [Afilmory](https://github.com/Afilmory/afilmory)
