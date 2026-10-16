document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = [
        {
            tag: '180° Rotational',
            title: '表: 陽 / 裏: 陰 (Yang / Yin)',
            description: '正位置では「陽」、180度回転させると「陰」が現れる相互補完的な対比アンビグラム。光と影の表裏一体を表現。',
            icon: 'fa-solid fa-rotate-right',
            mirror: false,
            svg: `<svg class="imges" viewBox="0 0 250 120" aria-label="Orenge and red ambigram">
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#f6e6ad" font-family="'Noto Serif JP', serif" font-size="36" font-weight="bold" letter-spacing="6">陽 ⇄ 陰</text>
                  </svg>`
        },
        {
            tag: 'Symbiotogram',
            title: '『アンビグラムハクブツカン』,',
            description: '博物館さを惹き立たせるために金をメインに豪華に見えるように作成。回転しても同じように読める共生型デザイン。',
            icon: 'fa-solid fa-rotate-right',
            mirror: false,
            svg: `<img class="ambigram-img" src="images/ambigram_museum.jpg" alt="Symbiotogram artwork">`
        },
        {
            tag: 'Natural Ambigram',
            title: '『夕焼け　赤のちオレンジ』',
            description: '回転させても文字の形が変わらず読み取れる自己回帰・保持型（Natural）アンビグラム。',
            icon: 'fa-solid fa-rotate-right',
            mirror: false,
            svg: `<img class="ambigram-img" src="images/Orenge_Red.jpg" alt="Natural ambigram artwork">`
        },
        {
            tag: 'Mirror Reflectional',
            title: '鏡像反転: MIRROR',
            description: '左右反転の対称性を持つ軸対称型アンビグラム。鏡を通すことで正位置のグラフィックが完璧に再現されます。',
            icon: 'fa-solid fa-left-right',
            mirror: true,
            svg: `<svg class="ambigram-img" viewBox="0 0 250 120" aria-label="Mirror reflection ambigram">
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#d4af37" font-family="'Cinzel', serif" font-size="34" font-weight="700" letter-spacing="6">MIRROR</text>
                  </svg>`
        },
        {
            tag: 'Katakana Symmetry',
            title: 'カタカナ: ハクブツカン',
            description: '博物館（ハクブツカン）の名称自体をカタカナで回転可能な形に落とし込んだ当館オリジナルのシンボル作品。',
            icon: 'fa-solid fa-rotate-right',
            mirror: false,
            svg: `<svg class="ambigram-img" viewBox="0 0 250 120" aria-label="Katakana museum ambigram">
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#f6e6ad" font-family="'Noto Serif JP', serif" font-size="32" font-weight="bold" letter-spacing="4">ハクブツカン</text>
                  </svg>`
        },
        {
            tag: 'Figure-Ground',
            title: '表: 夢 / 裏: 現 (Dream & Reality)',
            description: '図と地の空間隙間を利用し、回転させることで「夢」から「現（うつつ）」へと情景が遷移する幻想的な作風。',
            icon: 'fa-solid fa-rotate-right',
            mirror: false,
            svg: `<svg class="ambigram-img" viewBox="0 0 250 120" aria-label="Dream and reality ambigram">
                    <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#d4af37" font-family="'Noto Serif JP', serif" font-size="36" font-weight="bold" letter-spacing="8">夢 ⇄ 現</text>
                  </svg>`
        }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryGrid.innerHTML = galleryItems.map((item, index) => `
            <article class="ambigram-card">
                <div>
                    <div class="card-header-meta">
                        <span>EXHIBIT #${String(index + 1).padStart(2, '0')}</span>
                        <span class="card-tag">${item.tag}</span>
                    </div>
                    <div class="card-image-wrapper">
                        <div class="card-rotatable-target ${item.mirror ? 'mirror-flip' : ''}">
                            ${item.svg}
                        </div>
                        <div class="rotation-badge-hint"><i class="${item.icon}"></i> Hover / Tap</div>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            </article>
        `).join('');
    }

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    const heroCard = document.getElementById('heroCard');
    if (heroCard) {
        heroCard.addEventListener('click', () => {
            heroCard.classList.toggle('is-rotated');
        });
    }

    document.querySelectorAll('.card-image-wrapper').forEach((wrapper) => {
        wrapper.addEventListener('click', () => {
            const target = wrapper.querySelector('.card-rotatable-target');
            if (target) {
                target.classList.toggle('is-flipped');
            }
        });
    });

    const tabTextBtn = document.getElementById('tabTextBtn');
    const tabCanvasBtn = document.getElementById('tabCanvasBtn');
    const panelText = document.getElementById('panelText');
    const panelCanvas = document.getElementById('panelCanvas');

    if (tabTextBtn && tabCanvasBtn && panelText && panelCanvas) {
        tabTextBtn.addEventListener('click', () => {
            tabTextBtn.classList.add('active');
            tabCanvasBtn.classList.remove('active');
            panelText.classList.add('active');
            panelCanvas.classList.remove('active');
        });

        tabCanvasBtn.addEventListener('click', () => {
            tabCanvasBtn.classList.add('active');
            tabTextBtn.classList.remove('active');
            panelCanvas.classList.add('active');
            panelText.classList.remove('active');
            initCanvasLab();
        });
    }

    const simTextInput = document.getElementById('simTextInput');
    const simFontSelect = document.getElementById('simFontSelect');
    const simTextTarget = document.getElementById('simTextTarget');
    const btnSimRotate = document.getElementById('btnSimRotate');
    const btnSimMirror = document.getElementById('btnSimMirror');
    const btnSimReset = document.getElementById('btnSimReset');

    let simRotation = 0;
    let simMirrored = false;

    function updateSimTextTransform() {
        if (!simTextTarget) return;

        let transformStr = `rotate(${simRotation}deg)`;
        if (simMirrored) {
            transformStr += ' scaleX(-1)';
        }
        simTextTarget.style.transform = transformStr;
    }

    if (simTextInput && simTextTarget) {
        simTextInput.addEventListener('input', (event) => {
            simTextTarget.textContent = event.target.value || 'AMBIGRAM';
        });
    }

    if (simFontSelect && simTextTarget) {
        simFontSelect.addEventListener('change', (event) => {
            simTextTarget.style.fontFamily = event.target.value;
        });
    }

    if (btnSimRotate) {
        btnSimRotate.addEventListener('click', () => {
            simRotation += 180;
            updateSimTextTransform();
        });
    }

    if (btnSimMirror) {
        btnSimMirror.addEventListener('click', () => {
            simMirrored = !simMirrored;
            updateSimTextTransform();
        });
    }

    if (btnSimReset) {
        btnSimReset.addEventListener('click', () => {
            simRotation = 0;
            simMirrored = false;
            updateSimTextTransform();
        });
    }

    let isCanvasInitialized = false;
    let drawCanvas;
    let previewCanvas;
    let drawCtx;
    let previewCtx;
    let isDrawing = false;

    function initCanvasLab() {
        if (isCanvasInitialized) return;
        isCanvasInitialized = true;

        drawCanvas = document.getElementById('drawCanvas');
        previewCanvas = document.getElementById('previewCanvas');

        if (!drawCanvas || !previewCanvas) return;

        drawCtx = drawCanvas.getContext('2d');
        previewCtx = previewCanvas.getContext('2d');

        [drawCtx, previewCtx].forEach((ctx) => {
            ctx.strokeStyle = '#f6e6ad';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        });

        function syncPreview() {
            previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
            previewCtx.save();
            previewCtx.translate(previewCanvas.width / 2, previewCanvas.height / 2);
            previewCtx.rotate(Math.PI);
            previewCtx.drawImage(drawCanvas, -drawCanvas.width / 2, -drawCanvas.height / 2);
            previewCtx.restore();
        }

        function getCanvasCoords(event, canvas) {
            const rect = canvas.getBoundingClientRect();
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const clientY = event.touches ? event.touches[0].clientY : event.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function startDrawing(event) {
            isDrawing = true;
            const pos = getCanvasCoords(event, drawCanvas);
            drawCtx.beginPath();
            drawCtx.moveTo(pos.x, pos.y);
        }

        function draw(event) {
            if (!isDrawing) return;
            event.preventDefault();
            const pos = getCanvasCoords(event, drawCanvas);
            drawCtx.lineTo(pos.x, pos.y);
            drawCtx.stroke();
            syncPreview();
        }

        function stopDrawing() {
            if (isDrawing) {
                drawCtx.closePath();
                isDrawing = false;
                syncPreview();
            }
        }

        drawCanvas.addEventListener('mousedown', startDrawing);
        drawCanvas.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', stopDrawing);

        drawCanvas.addEventListener('touchstart', startDrawing);
        drawCanvas.addEventListener('touchmove', draw);
        drawCanvas.addEventListener('touchend', stopDrawing);

        document.getElementById('btnClearCanvas').addEventListener('click', () => {
            drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            syncPreview();
        });
    }
});
