/**
 * Constellations Background Effect
 * Creates animated nodes and connecting lines similar to solazzoedits.com
 */

class ConstellationsCanvas {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.nodes = [];
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        // Configuration
        this.config = {
            nodeCount: 60,
            connectionDistance: 180,
            nodeRadius: 2,
            lineWidth: 0.8,
            nodeSpeed: 1.2,
            mouseInfluence: 0.4,
            mouseRadius: 250,
            colors: {
                node: '#00d9ff',
                line: '#4a9eff',
                glow: '#00ffcc'
            },
            performance: {
                // Reduce node count on mobile
                isMobile: window.innerWidth < 768
            }
        };
        
        // Adjust node count for mobile
        if (this.config.performance.isMobile) {
            this.config.nodeCount = 35;
            this.config.connectionDistance = 120;
        }
        
        this.init();
    }
    
    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'constellations-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize DPR on canvas
        this.canvas.dpr = window.devicePixelRatio || 1;
        
        // Set canvas size
        this.resize();
        
        // Create nodes after resize
        this.createNodes();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start animation
        this.animate();
    }
    
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        
        // Save current node positions relative to old canvas size (only if canvas already has size)
        if (this.canvas.width > 0 && this.canvas.height > 0 && this.nodes.length > 0) {
            const oldWidth = this.canvas.width / this.canvas.dpr;
            const oldHeight = this.canvas.height / this.canvas.dpr;
            
            if (oldWidth > 0 && oldHeight > 0) {
                const scaleX = width / oldWidth;
                const scaleY = height / oldHeight;
                
                // Scale node positions
                this.nodes.forEach(node => {
                    node.x = node.x * scaleX;
                    node.y = node.y * scaleY;
                });
            }
        }
        
        // Set actual canvas size with device pixel ratio for retina displays
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.dpr = dpr;
        
        // Reset transform and scale context to handle device pixel ratio
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        
        // Set display size (CSS pixels)
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        // Check if mobile and adjust config
        const wasMobile = this.config.performance.isMobile;
        this.config.performance.isMobile = width < 768;
        
        if (wasMobile !== this.config.performance.isMobile) {
            if (this.config.performance.isMobile) {
                this.config.nodeCount = 35;
                this.config.connectionDistance = 120;
            } else {
                this.config.nodeCount = 60;
                this.config.connectionDistance = 180;
            }
            this.createNodes();
        }
    }
    
    createNodes() {
        const dpr = this.canvas.dpr || window.devicePixelRatio || 1;
        const width = this.canvas.width / dpr;
        const height = this.canvas.height / dpr;
        
        this.nodes = [];
        for (let i = 0; i < this.config.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * this.config.nodeSpeed * 1.5,
                vy: (Math.random() - 0.5) * this.config.nodeSpeed * 1.5,
                radius: this.config.nodeRadius + Math.random() * 1.5,
                opacity: 0.4 + Math.random() * 0.6
            });
        }
    }
    
    setupEventListeners() {
        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
                // Recreate nodes to fill new space
                this.createNodes();
            }, 250);
        });
        
        // Mouse movement for interactive effect
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    updateNodes() {
        const dpr = this.canvas.dpr || window.devicePixelRatio || 1;
        const width = this.canvas.width / dpr;
        const height = this.canvas.height / dpr;
        
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Mouse interaction
            const dx = this.mouseX - node.x;
            const dy = this.mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.config.mouseRadius) {
                const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
                const angle = Math.atan2(dy, dx);
                node.vx -= Math.cos(angle) * force * this.config.mouseInfluence * 0.02;
                node.vy -= Math.sin(angle) * force * this.config.mouseInfluence * 0.02;
            }
            
            // Boundary collision with wrap-around
            if (node.x < 0) {
                node.x = width;
            } else if (node.x > width) {
                node.x = 0;
            }
            
            if (node.y < 0) {
                node.y = height;
            } else if (node.y > height) {
                node.y = 0;
            }
            
            // Apply less damping to velocity for more movement
            node.vx *= 0.995;
            node.vy *= 0.995;
            
            // Add more random movement
            node.vx += (Math.random() - 0.5) * 0.08;
            node.vy += (Math.random() - 0.5) * 0.08;
            
            // Limit velocity
            const maxSpeed = this.config.nodeSpeed * 1.5;
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > maxSpeed) {
                node.vx = (node.vx / speed) * maxSpeed;
                node.vy = (node.vy / speed) * maxSpeed;
            }
        });
    }
    
    drawConnections() {
        const nodes = this.nodes;
        const ctx = this.ctx;
        const maxDistance = this.config.connectionDistance;
        
        // Use a spatial optimization to reduce calculations
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distanceSquared = dx * dx + dy * dy;
                const maxDistanceSquared = maxDistance * maxDistance;
                
                // Skip if too far (using squared distance for performance)
                if (distanceSquared > maxDistanceSquared) continue;
                
                const distance = Math.sqrt(distanceSquared);
                
                // Calculate opacity based on distance
                const opacity = (1 - distance / maxDistance) * 0.35;
                
                // Draw line with gradient-like effect
                ctx.strokeStyle = this.config.colors.line;
                ctx.lineWidth = this.config.lineWidth;
                ctx.globalAlpha = opacity;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                
                // Add subtle glow effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.config.colors.glow;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
        
        ctx.globalAlpha = 1;
    }
    
    drawNodes() {
        const ctx = this.ctx;
        
        this.nodes.forEach(node => {
            // Draw glow
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, this.config.colors.node);
            gradient.addColorStop(0.5, this.config.colors.glow);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.globalAlpha = node.opacity * 0.4;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw node
            ctx.fillStyle = this.config.colors.node;
            ctx.globalAlpha = node.opacity;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw inner glow
            ctx.fillStyle = this.config.colors.glow;
            ctx.globalAlpha = node.opacity * 0.6;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
    }
    
    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update nodes
        this.updateNodes();
        
        // Draw connections first (behind nodes)
        this.drawConnections();
        
        // Draw nodes
        this.drawNodes();
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.constellationsCanvas = new ConstellationsCanvas();
    });
} else {
    window.constellationsCanvas = new ConstellationsCanvas();
}

