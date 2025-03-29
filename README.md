# Jupyter Lab Timeout Controller | Jupyter Lab 超时控制器

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/wanglrebe/Jupyter-alive)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

[English](#english) | [中文](#中文)

### 🔗 Quick Install | 快速安装
**[Click here for easy installation page | 点击此处访问便捷安装页面](https://wanglrebe.github.io/Documents/Jupyter_Timeout_Controller_Installation.html)**

## English

### Introduction
A browser-based tool for automatically managing Jupyter Lab session timeouts. This tool helps prevent session disconnections by intelligently resetting the timeout counter before it expires.

### Compatibility & Use Cases
This tool is specifically designed for:
- Jupyter Lab instances running in containerized environments, particularly those deployed via OKD (OpenShift Kubernetes Distribution)
- Environments where a timeout counter is visible in the top-right corner of the Jupyter Lab interface
- Systems that use the standard Jupyter timeout mechanism

You can determine if this tool is suitable for your environment by:
1. Looking for a timeout indicator in the top-right corner of your Jupyter Lab interface (e.g., "Timeout: 2/10")
2. Checking if clicking this indicator resets the timer
3. Using browser developer tools to verify timeout data is structured like:
```json
{
  "inactive_min": 2,
  "timeout_min": 10,
  "remaining_min": 8,
  "warn": false
}
```

### How It Works
The tool identifies the timeout counter in the Jupyter Lab interface and periodically simulates clicks on it to reset the inactivity timer. It uses intelligent timing algorithms to:
1. Detect the configured timeout duration
2. Calculate optimal reset intervals
3. Monitor remaining time and perform emergency resets when needed
4. Simulate natural user activity with randomized timing

### Features
- Automatic timeout detection and management
- Smart random interval resets to simulate human activity
- Emergency reset when timeout is approaching
- User-friendly interface with real-time status display
- Configurable settings for different timeout scenarios
- Automatic language detection (English/Chinese)
- Pure JavaScript implementation with no external dependencies

### Quick Start - Bookmark Method
1. Create a new bookmark in your browser:
   - Right-click on your browser's bookmark bar
   - Select "Add bookmark" or "New bookmark"
   - Name: `Jupyter Timeout Controller` (or any name you prefer)
   - Copy and paste the following code into the URL/Location field:
   ```javascript
   javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/wanglrebe/Jupyter-alive@main/timeout-controller.min.js';document.body.appendChild(s)})();
   ```

2. Using the bookmark:
   - Open your Jupyter Lab session
   - Click the bookmark you just created
   - A control button will appear in the bottom-right corner
   - Single click to start/stop the timeout control
   - Double click to open settings panel

### Configuration Options
- Minimum Interval: Shortest time between resets (5-30% of timeout)
- Maximum Interval: Longest time between resets (10-50% of timeout)
- Auto Reset Threshold: Trigger emergency reset when remaining time is below this percentage

### Project Structure
- `timeout-controller.js` - Main source code with full comments
- `timeout-controller.min.js` - Minified version for production use
- `minify_script.py` - Python script for generating the minified version

### Troubleshooting
If you encounter issues:
- Make sure your Jupyter Lab instance has a visible timeout counter
- Check if the environment matches the compatibility requirements
- Try refreshing the page and reapplying the script
- Check browser console for any error messages

### Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Notes
- The script automatically detects your browser's language settings
- All timeouts are handled locally in the browser
- No data is sent to external servers
- The script needs to be reapplied after page refresh

---

## 中文

### 简介
一个基于浏览器的 Jupyter Lab 会话超时管理工具。通过智能重置超时计数器来防止会话断开连接。

### 兼容性和适用场景
该工具专为以下环境设计：
- 在容器化环境中运行的 Jupyter Lab 实例，特别是通过 OKD（OpenShift Kubernetes Distribution）部署的实例
- Jupyter Lab 界面右上角有超时计数器的环境
- 使用标准 Jupyter 超时机制的系统

您可以通过以下方式确定此工具是否适合您的环境：
1. 查看 Jupyter Lab 界面右上角是否有超时指示器（例如："Timeout: 2/10"）
2. 确认点击此指示器是否可以重置计时器
3. 使用浏览器开发者工具验证超时数据的结构是否类似于：
```json
{
  "inactive_min": 2,
  "timeout_min": 10,
  "remaining_min": 8,
  "warn": false
}
```

### 工作原理
该工具识别 Jupyter Lab 界面中的超时计数器，并定期模拟点击以重置不活动计时器。它使用智能计时算法：
1. 检测配置的超时时长
2. 计算最佳重置间隔
3. 监控剩余时间并在需要时执行紧急重置
4. 使用随机计时模拟自然用户活动

### 功能特点
- 自动检测和管理超时
- 智能随机间隔重置，模拟人工操作
- 接近超时时自动紧急重置
- 用户友好的界面，实时显示状态
- 可配置的设置选项
- 自动语言检测（中文/英文）
- 纯 JavaScript 实现，无外部依赖

### 快速开始 - 书签方式
1. 在浏览器中创建新书签：
   - 右键点击浏览器的书签栏
   - 选择"添加书签"或"新建书签"
   - 名称：`Jupyter 超时控制器`（或任何你喜欢的名称）
   - 将以下代码复制粘贴到 URL/网址 栏：
   ```javascript
   javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/wanglrebe/Jupyter-alive@main/timeout-controller.min.js';document.body.appendChild(s)})();
   ```

2. 使用书签：
   - 打开你的 Jupyter Lab 会话
   - 点击刚才创建的书签
   - 右下角会出现控制按钮
   - 单击启动/停止超时控制
   - 双击打开设置面板

### 配置选项
- 最小间隔：两次重置之间的最短时间（超时时间的5-30%）
- 最大间隔：两次重置之间的最长时间（超时时间的10-50%）
- 自动重置阈值：剩余时间低于此百分比时触发紧急重置

### 项目结构
- `timeout-controller.js` - 带完整注释的主源代码
- `timeout-controller.min.js` - 用于生产环境的压缩版本
- `minify_script.py` - 用于生成压缩版本的Python脚本

### 故障排除
如果您遇到问题：
- 确保您的 Jupyter Lab 实例有可见的超时计数器
- 检查环境是否符合兼容性要求
- 尝试刷新页面并重新应用脚本
- 检查浏览器控制台是否有错误消息

### 参与贡献
欢迎贡献！要参与贡献：
1. Fork 存储库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加一些很棒的特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 注意事项
- 脚本会自动检测浏览器语言设置
- 所有超时处理都在浏览器本地进行
- 不会向外部服务器发送数据
- 页面刷新后需要重新运行脚本