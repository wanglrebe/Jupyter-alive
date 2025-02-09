# Jupyter Lab Timeout Controller | Jupyter Lab 超时控制器

[English](#english) | [中文](#中文)

## English

### Introduction
A browser-based tool for automatically managing Jupyter Lab session timeouts. This tool helps prevent session disconnections by intelligently resetting the timeout counter before it expires.

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

### Notes
- The script automatically detects your browser's language settings
- All timeouts are handled locally in the browser
- No data is sent to external servers
- The script needs to be reapplied after page refresh

---

## 中文

### 简介
一个基于浏览器的 Jupyter Lab 会话超时管理工具。通过智能重置超时计数器来防止会话断开连接。

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

### 注意事项
- 脚本会自动检测浏览器语言设置
- 所有超时处理都在浏览器本地进行
- 不会向外部服务器发送数据
- 页面刷新后需要重新运行脚本