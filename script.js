// 语言配置
const TRANSLATIONS = {
    en: {
        buttonStart: 'Start Timeout Control',
        buttonStop: 'Stop Timeout Control',
        panelTitle: 'Timeout Control Settings',
        status: 'Status',
        statusRunning: 'Running',
        statusStopped: 'Stopped',
        timeoutSetting: 'Timeout Setting',
        detecting: 'Detecting...',
        currentProgress: 'Current Progress',
        resetCount: 'Reset Count',
        minIntervalLabel: 'Min Interval (5-30%)',
        maxIntervalLabel: 'Max Interval (10-50%)',
        dangerThresholdLabel: 'Auto Reset when Remaining Time Below (%)',
        minutes: 'minutes',
        remaining: 'remaining',
        startControl: 'Start Control',
        stopControl: 'Stop Control',
        showSettings: 'Show Settings',
        hideSettings: 'Hide Settings'
    },
    zh: {
        buttonStart: '启动超时控制',
        buttonStop: '停止超时控制',
        panelTitle: '超时控制设置',
        status: '状态',
        statusRunning: '运行中',
        statusStopped: '已停止',
        timeoutSetting: '超时设置',
        detecting: '检测中...',
        currentProgress: '当前进度',
        resetCount: '重置次数',
        minIntervalLabel: '最小间隔 (5-30%)',
        maxIntervalLabel: '最大间隔 (10-50%)',
        dangerThresholdLabel: '剩余时间低于此百分比时自动重置',
        minutes: '分钟',
        remaining: '剩余',
        startControl: '启动控制',
        stopControl: '停止控制',
        showSettings: '显示设置',
        hideSettings: '隐藏设置'
    }
};

// 获取用户语言，默认使用英语
function getUserLanguage() {
    const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    // 如果是中文（包括简体和繁体），返回 zh，否则返回 en
    return lang.startsWith('zh') ? 'zh' : 'en';
}

// 获取翻译
const LANG = getUserLanguage();
const T = TRANSLATIONS[LANG];




// 创建并插入样式
const style = document.createElement('style');
style.textContent = `
.timeout-control {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
}

.timeout-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.timeout-button:hover {
    background: #0056b3;
}

.timeout-button.active {
    background: #dc3545;
}

.timeout-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10001;
    min-width: 300px;
    display: none;
}

.timeout-panel.show {
    display: block;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.panel-title {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 0 5px;
}

.status-info {
    margin: 10px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
}

.config-section {
    margin: 15px 0;
}

.config-item {
    margin: 8px 0;
}

.config-item label {
    display: block;
    margin-bottom: 4px;
}

.config-item input {
    width: 100%;
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    display: none;
}

.overlay.show {
    display: block;
}
`;
document.head.appendChild(style);

// 修改创建UI函数中的文本
function createUI() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const controlButton = document.createElement('div');
    controlButton.className = 'timeout-control';
    controlButton.innerHTML = `<button class="timeout-button">${T.buttonStart}</button>`;
    document.body.appendChild(controlButton);

    const panel = document.createElement('div');
    panel.className = 'timeout-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3 class="panel-title">${T.panelTitle}</h3>
            <button class="close-button">&times;</button>
        </div>
        <div class="status-info">
            <div>${T.status}: <span id="script-status">${T.statusStopped}</span></div>
            <div>${T.timeoutSetting}: <span id="timeout-detected">${T.detecting}</span></div>
            <div>${T.currentProgress}: <span id="current-progress">-</span></div>
            <div>${T.resetCount}: <span id="reset-count">0</span></div>
        </div>
        <div class="config-section">
            <div class="config-item">
                <label>${T.minIntervalLabel}</label>
                <input type="number" id="min-interval" value="7.5" min="5" max="30" step="0.5">
            </div>
            <div class="config-item">
                <label>${T.maxIntervalLabel}</label>
                <input type="number" id="max-interval" value="20" min="10" max="50" step="0.5">
            </div>
            <div class="config-item">
                <label>${T.dangerThresholdLabel}</label>
                <input type="number" id="danger-threshold" value="20" min="10" max="40" step="1">
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    return {
        button: controlButton.querySelector('.timeout-button'),
        panel,
        overlay,
        closeButton: panel.querySelector('.close-button'),
        statusSpan: panel.querySelector('#script-status'),
        timeoutSpan: panel.querySelector('#timeout-detected'),
        progressSpan: panel.querySelector('#current-progress'),
        resetCountSpan: panel.querySelector('#reset-count'),
        minIntervalInput: panel.querySelector('#min-interval'),
        maxIntervalInput: panel.querySelector('#max-interval'),
        dangerThresholdInput: panel.querySelector('#danger-threshold')
    };
}

// 更新UI函数修改
function updateUI() {
    const ui = window.timeoutUI;
    if (!ui) return;

    ui.statusSpan.textContent = STATE.isRunning ? T.statusRunning : T.statusStopped;
    ui.statusSpan.style.color = STATE.isRunning ? '#28a745' : '#dc3545';
    
    if (STATE.timeoutMin !== null) {
        ui.timeoutSpan.textContent = `${STATE.timeoutMin} ${T.minutes}`;
        ui.resetCountSpan.textContent = STATE.totalResets;
    }

    // 更新切换按钮文本
    ui.button.textContent = STATE.isRunning ? T.buttonStop : T.buttonStart;
    ui.button.className = `timeout-button ${STATE.isRunning ? 'active' : ''}`;

    // 更新工具提示
    ui.button.title = STATE.isRunning ? T.stopControl : T.startControl;
    if (ui.panel.classList.contains('show')) {
        ui.button.title += ` (${T.hideSettings})`;
    } else {
        ui.button.title += ` (${T.showSettings})`;
    }
}

// 修改状态检查函数中的显示
function checkStatus() {
    const menuItems = Array.from(document.querySelectorAll('.lm-MenuBar-item'));
    const timeoutButton = menuItems.find(item => item.textContent.includes('Timeout:'));
    
    if (timeoutButton) {
        const text = timeoutButton.textContent;
        const match = text.match(/Timeout:\s*(\d+(\.\d+)?)\s*\/\s*(\d+(\.\d+)?)/);
        
        if (match) {
            const currentMin = parseFloat(match[1]);
            const totalMin = parseFloat(match[3]);
            
            if (STATE.timeoutMin === null) {
                STATE.timeoutMin = totalMin;
                calculateIntervalRange(totalMin * 60 * 1000);
            }
            
            const remainingRatio = 1 - (currentMin / totalMin);
            
            if (window.timeoutUI) {
                window.timeoutUI.progressSpan.textContent = 
                    `${currentMin.toFixed(1)}/${totalMin} ${T.minutes} (${T.remaining} ${(remainingRatio * 100).toFixed(1)}%)`;
            }
            
            if (remainingRatio <= CONFIG.dangerThreshold) {
                resetTimeout();
            }
        }
    }
    updateUI();
}

// 配置和状态管理
const CONFIG = {
    minIntervalPercent: 0.075,
    maxIntervalPercent: 0.2,
    dangerThreshold: 0.2,
    absoluteMinInterval: 15 * 1000,
    absoluteMaxInterval: 300 * 1000,
    checkInterval: 5000
};

const STATE = {
    timeoutMin: null,
    resetTimer: null,
    checkTimer: null,
    totalResets: 0,
    intervalRange: {
        min: null,
        max: null
    },
    isRunning: false
};

// 之前的核心功能函数（保持不变）
function calculateIntervalRange(totalTimeoutMs) {
    STATE.intervalRange.min = Math.max(CONFIG.absoluteMinInterval,
        Math.min(totalTimeoutMs * CONFIG.minIntervalPercent, CONFIG.absoluteMaxInterval));
    STATE.intervalRange.max = Math.max(CONFIG.absoluteMinInterval,
        Math.min(totalTimeoutMs * CONFIG.maxIntervalPercent, CONFIG.absoluteMaxInterval));
    
    if (STATE.intervalRange.max <= STATE.intervalRange.min) {
        STATE.intervalRange.max = STATE.intervalRange.min * 1.5;
    }
    
    const safeMaxInterval = totalTimeoutMs * (1 - CONFIG.dangerThreshold);
    if (STATE.intervalRange.max > safeMaxInterval) {
        STATE.intervalRange.max = safeMaxInterval * 0.8;
        STATE.intervalRange.min = Math.min(STATE.intervalRange.min, STATE.intervalRange.max * 0.5);
    }
}

function getRandomInterval() {
    return Math.floor(Math.random() * (STATE.intervalRange.max - STATE.intervalRange.min)) + STATE.intervalRange.min;
}

function resetTimeout() {
    try {
        const menuItems = Array.from(document.querySelectorAll('.lm-MenuBar-item'));
        const timeoutButton = menuItems.find(item => item.textContent.includes('Timeout:'));
        
        if (timeoutButton) {
            timeoutButton.click();
            STATE.totalResets++;
            const nextInterval = getRandomInterval();
            updateUI();
            return true;
        }
        return false;
    } catch (error) {
        console.error('重置出错：', error);
        return false;
    }
}

// 启动和停止函数
function startScript() {
    if (STATE.isRunning) return;
    
    STATE.isRunning = true;
    STATE.checkTimer = setInterval(checkStatus, CONFIG.checkInterval);
    
    STATE.resetTimer = setTimeout(function scheduleReset() {
        if (STATE.timeoutMin === null) {
            STATE.resetTimer = setTimeout(scheduleReset, 1000);
            return;
        }
        
        if (resetTimeout()) {
            STATE.resetTimer = setTimeout(scheduleReset, getRandomInterval());
        }
    }, CONFIG.checkInterval * 2);
    
    updateUI();
}

function stopScript() {
    if (!STATE.isRunning) return;
    
    if (STATE.resetTimer) {
        clearTimeout(STATE.resetTimer);
        STATE.resetTimer = null;
    }
    if (STATE.checkTimer) {
        clearInterval(STATE.checkTimer);
        STATE.checkTimer = null;
    }
    
    STATE.isRunning = false;
    updateUI();
}

// 确保在UI的每次交互后都更新显示
function initializeControl() {
    const ui = createUI();
    window.timeoutUI = ui;

    ui.button.addEventListener('click', () => {
        if (STATE.isRunning) {
            stopScript();
        } else {
            startScript();
        }
        updateUI();
    });

    ui.button.addEventListener('dblclick', () => {
        ui.panel.classList.add('show');
        ui.overlay.classList.add('show');
        updateUI();
    });

    ui.closeButton.addEventListener('click', () => {
        ui.panel.classList.remove('show');
        ui.overlay.classList.remove('show');
        updateUI();
    });

    ui.overlay.addEventListener('click', () => {
        ui.panel.classList.remove('show');
        ui.overlay.classList.remove('show');
        updateUI();
    });

    // 初始工具提示
    ui.button.title = T.startControl + ` (${T.showSettings})`;

    // 配置项更改处理
    function handleConfigChange() {
        CONFIG.minIntervalPercent = ui.minIntervalInput.value / 100;
        CONFIG.maxIntervalPercent = ui.maxIntervalInput.value / 100;
        CONFIG.dangerThreshold = ui.dangerThresholdInput.value / 100;
        
        if (STATE.timeoutMin !== null) {
            calculateIntervalRange(STATE.timeoutMin * 60 * 1000);
        }
    }

    ui.minIntervalInput.addEventListener('change', handleConfigChange);
    ui.maxIntervalInput.addEventListener('change', handleConfigChange);
    ui.dangerThresholdInput.addEventListener('change', handleConfigChange);

    // 初始状态更新
    updateUI();
}

// 启动控制界面
initializeControl();