# Cloudflare Worker TG反代

使用 Cloudflare Worker 反代 Telegram Bot API，并内置防盗用功能。

## 基于本地环境部署

1. 安装依赖：

   ```bash
   npm install
   ```

2. 设置防盗用密钥（推荐）：

   ```bash
   npx wrangler secret put SECRET
   ```

3. 部署到 Cloudflare：

   ```bash
   npm run deploy
   ```

## 直接部署到CF

1. 在 Worker 页面点击 “创建应用程序”

2. 选择 Continue With Github，并选择本项目

3. 配置环境变量，手动设置 `SECRET` （随机字母加数字即可）

## 使用

### 不启用密钥

直接将 Telegram Bot API 的 `https://api.telegram.org` 替换为你的 Worker 地址：

```
https://<your-worker>.workers.dev/bot<TOKEN>/<METHOD>
```

### 启用密钥（防盗用）

设置 `SECRET` 后，所有请求需在路径首段附上密钥：

```
https://<your-worker>.workers.dev/<SECRET>/bot<TOKEN>/<METHOD>
```

不含有效密钥的请求将返回 `403 Forbidden`。

## 本地开发

```bash
npm run dev
```
