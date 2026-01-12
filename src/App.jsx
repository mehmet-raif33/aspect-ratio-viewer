import { useState } from 'react'

const ratios = [
    { ratio: "1:1", name: "Square", description: "Instagram profile photos, social media posts", tags: ["Instagram", "Facebook", "Profile"] },
    { ratio: "16:9", name: "Widescreen", description: "YouTube, TV broadcasts, cinematic videos", tags: ["YouTube", "TV", "Video"] },
    { ratio: "3:2", name: "Classic Photo", description: "DSLR photos, print photography", tags: ["Photography", "Print", "DSLR"] },
    { ratio: "2:3", name: "Portrait Photo", description: "Vertical photos, book covers", tags: ["Portrait", "Book", "Poster"] },
    { ratio: "4:5", name: "Instagram Portrait", description: "Instagram vertical posts, portraits", tags: ["Instagram", "Portrait", "Mobile"] },
    { ratio: "5:4", name: "Large Format", description: "Large format photography", tags: ["Photography", "Print"] },
    { ratio: "9:16", name: "Stories/Reels", description: "Instagram/TikTok stories and reels", tags: ["TikTok", "Reels", "Stories"] },
    { ratio: "3:4", name: "Tablet Portrait", description: "Tablet screens, vertical videos", tags: ["Tablet", "iPad", "Mobile"] },
    { ratio: "4:3", name: "Classic TV", description: "Old TV format, iPad, presentation slides", tags: ["TV", "Slides", "iPad"] }
]

function calculateDimensions(ratio) {
    const [w, h] = ratio.split(':').map(Number)
    const maxSize = 320

    if (w >= h) {
        return { width: maxSize, height: (h / w) * maxSize }
    } else {
        return { width: (w / h) * maxSize, height: maxSize }
    }
}

function getMiniDimensions(ratio) {
    const [w, h] = ratio.split(':').map(Number)
    const maxSize = 24

    if (w >= h) {
        return { width: maxSize, height: Math.max((h / w) * maxSize, 8) }
    } else {
        return { width: Math.max((w / h) * maxSize, 8), height: maxSize }
    }
}

function App() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)
    const selected = ratios[selectedIndex]
    const dims = calculateDimensions(selected.ratio)

    const handleSelect = (index) => {
        setSelectedIndex(index)
        setMenuOpen(false)
    }

    return (
        <>
            {/* Comix Studio Banner */}
            <div className="promo-banner">
                <div className="promo-icon">
                    <span className="promo-spark"></span>
                </div>
                <span className="promo-text">Want to create comics with AI?</span>
                <a href="https://www.comixstudio.art" target="_blank" rel="noopener noreferrer" className="promo-link">
                    Comix Studio →
                </a>
            </div>

            <div className="container">
                <header>
                    <h1>Aspect <span>Ratio</span></h1>
                    <p className="subtitle">Explore image ratios interactively</p>
                </header>

                <div className="main-content">
                    {/* Mobile Menu Button */}
                    <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                        <span>{selected.ratio}</span>
                        <svg className={menuOpen ? 'rotate' : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>

                    {/* Ratio List */}
                    <div className={`ratio-list ${menuOpen ? 'open' : ''}`}>
                        <h2>Ratios</h2>
                        {ratios.map((item, index) => {
                            const miniDims = getMiniDimensions(item.ratio)
                            return (
                                <div
                                    key={item.ratio}
                                    className={`ratio-item ${index === selectedIndex ? 'active' : ''}`}
                                    onClick={() => handleSelect(index)}
                                >
                                    <span className="ratio-label">{item.ratio}</span>
                                    <div className="ratio-mini">
                                        <div
                                            className="ratio-mini-box"
                                            style={{ width: miniDims.width, height: miniDims.height }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Overlay for mobile */}
                    {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}

                    <div className="preview-panel">
                        <div className="preview-container">
                            <div className="preview-header">
                                <span className="preview-title">{selected.ratio}</span>
                                <span className="preview-dimensions">{selected.name}</span>
                            </div>
                            <div className="preview-box-wrapper">
                                <div
                                    className="preview-box"
                                    style={{ width: dims.width, height: dims.height }}
                                >
                                    <span className="preview-ratio-text">{selected.ratio}</span>
                                </div>
                            </div>
                            <div className="ratio-info">
                                <h3>Common Uses</h3>
                                <p>{selected.description}</p>
                                <div className="usage-tags">
                                    {selected.tags.map(tag => (
                                        <span key={tag} className="usage-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="footer-cta">
                            <h3>Unleash your creativity</h3>
                            <p>AI-powered comic creation platform</p>
                            <a href="https://www.comixstudio.art" target="_blank" rel="noopener noreferrer" className="cta-button">
                                Try Comix Studio
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
