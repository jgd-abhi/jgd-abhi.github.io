:root {
    --bg: #0f172a;
    --card: #1e293b;
    --accent: #38bdf8;
    --text: #f1f5f9;
    --subtle: #94a3b8;
}

body.light {
    --bg: #f4f6f8;
    --card: #ffffff;
    --accent: #0284c7;
    --text: #0f172a;
    --subtle: #475569;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: monospace;
    background: var(--bg);
    color: var(--text);
    transition: 0.4s ease;
}

.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 6px 14px;
    background: var(--card);
    border: 1px solid var(--accent);
    color: var(--text);
    border-radius: 20px;
    cursor: pointer;
}

#particles {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.hero {
    text-align: center;
    padding: 140px 20px 80px;
}

.terminal {
    background: var(--card);
    padding: 40px;
    border-radius: 14px;
    display: inline-block;
    box-shadow: 0 0 25px rgba(56,189,248,0.3);
    min-width: 300px;
}

#typing {
    white-space: pre-line;
    font-size: 16px;
    line-height: 1.6;
    color: var(--accent);
}

.btn {
    padding: 10px 20px;
    margin: 10px;
    text-decoration: none;
    background: var(--accent);
    color: black;
    border-radius: 6px;
    font-weight: bold;
    transition: 0.3s;
}

.btn.outline {
    background: transparent;
    border: 1px solid var(--accent);
    color: var(--accent);
}

.section {
    padding: 80px 20px;
    text-align: center;
}

.pipeline {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
}

.stage {
    padding: 12px 20px;
    background: var(--card);
    border: 1px solid var(--accent);
    border-radius: 8px;
    animation: pulse 2s infinite;
}

.stage.prod {
    background: var(--accent);
    color: black;
}

.arrow {
    width: 30px;
    height: 2px;
    background: var(--accent);
    position: relative;
}

.arrow::after {
    content: "";
    position: absolute;
    right: -5px;
    top: -4px;
    border-left: 6px solid var(--accent);
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
}

@keyframes pulse {
    0% { box-shadow: 0 0 5px var(--accent); }
    50% { box-shadow: 0 0 20px var(--accent); }
    100% { box-shadow: 0 0 5px var(--accent); }
}

.badges {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
}

.badges span {
    padding: 8px 18px;
    background: var(--card);
    border: 1px solid var(--accent);
    border-radius: 20px;
    transition: 0.3s;
}

.badges span:hover {
    transform: translateY(-6px);
    background: var(--accent);
    color: black;
}

.repos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.repo-card {
    background: var(--card);
    padding: 20px;
    border-radius: 12px;
    transition: 0.3s;
}

.repo-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 25px rgba(56,189,248,0.3);
}

footer {
    text-align: center;
    padding: 40px;
    color: var(--subtle);
}
