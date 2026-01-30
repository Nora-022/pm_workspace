import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Polygon, Circle, PathPatch
from matplotlib.path import Path
import matplotlib.font_manager as fm
import random

# Configuration
WIDTH, HEIGHT = 2000, 3000
DPI = 300
BG_COLOR = "#050510"  # Midnight Indigo
COLOR_PALETTE = [
    "#FFD700",  # Gold
    "#39FF14",  # Neon Green/Lime
    "#00FFFF",  # Cyan
    "#FF00FF",  # Magenta (accent)
    "#FFFFFF"   # White
]

def setup_canvas():
    fig = plt.figure(figsize=(WIDTH/DPI, HEIGHT/DPI), dpi=DPI)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, WIDTH)
    ax.set_ylim(0, HEIGHT)
    ax.set_facecolor(BG_COLOR)
    ax.axis('off')
    return fig, ax

def draw_radiant_geometry(ax):
    # Center point
    cx, cy = WIDTH / 2, HEIGHT / 2
    
    # 1. Radial Lines (The "Burst")
    for _ in range(150):
        angle = random.uniform(0, 2 * np.pi)
        length = random.uniform(WIDTH * 0.2, WIDTH * 0.8)
        x2 = cx + length * np.cos(angle)
        y2 = cy + length * np.sin(angle)
        
        color = random.choice(COLOR_PALETTE)
        alpha = random.uniform(0.05, 0.2)
        width = random.uniform(0.5, 2.0)
        
        ax.plot([cx, x2], [cy, y2], color=color, alpha=alpha, linewidth=width)

    # 2. Orbital Circles
    for _ in range(10):
        radius = random.uniform(WIDTH * 0.1, WIDTH * 0.6)
        color = random.choice(COLOR_PALETTE)
        alpha = random.uniform(0.05, 0.15)
        width = random.uniform(0.5, 1.5)
        circle = Circle((cx, cy), radius, color=color, fill=False, linewidth=width, alpha=alpha)
        ax.add_patch(circle)

def draw_crystalline_shapes(ax):
    # Random polygons floating
    for _ in range(15):
        num_points = random.randint(3, 5)
        center_x = random.uniform(0, WIDTH)
        center_y = random.uniform(0, HEIGHT)
        radius = random.uniform(50, 300)
        
        angles = np.linspace(0, 2*np.pi, num_points, endpoint=False)
        angles += random.uniform(0, np.pi) # Rotate
        
        points = []
        for angle in angles:
            r = radius * random.uniform(0.8, 1.2)
            points.append([center_x + r * np.cos(angle), center_y + r * np.sin(angle)])
            
        color = random.choice(COLOR_PALETTE)
        alpha = random.uniform(0.02, 0.08)
        poly = Polygon(points, closed=True, color=color, alpha=alpha, linewidth=0)
        ax.add_patch(poly)
        
        # Add a thin outline to some
        if random.random() > 0.5:
            poly_outline = Polygon(points, closed=True, color=color, fill=False, alpha=0.3, linewidth=0.8)
            ax.add_patch(poly_outline)

def draw_typography(ax):
    cx, cy = WIDTH / 2, HEIGHT / 2
    
    # Main Year: 2026
    # We split it to make it structural
    # 20
    # 26
    
    font_props_huge = fm.FontProperties(family='sans-serif', weight='bold', size=250)
    font_props_med = fm.FontProperties(family='sans-serif', weight='light', size=40)
    font_props_small = fm.FontProperties(family='monospace', size=12)

    # Vertical offset for the two lines
    offset_y = 150
    
    # Top Text "20"
    ax.text(cx, cy + offset_y, "2 0", color="white", ha='center', va='bottom', 
            fontproperties=font_props_huge, alpha=0.9)
            
    # Bottom Text "26"
    ax.text(cx, cy - offset_y, "2 6", color="white", ha='center', va='top', 
            fontproperties=font_props_huge, alpha=0.9)
            
    # Line between them
    ax.plot([cx - 300, cx + 300], [cy, cy], color=COLOR_PALETTE[1], linewidth=2, alpha=0.8)
    
    # Subtitle
    ax.text(cx, cy - offset_y - 250, "L U M I N O U S   E P O C H", 
            color=COLOR_PALETTE[2], ha='center', va='top', fontproperties=font_props_med, alpha=0.8)
            
    # Technical markings - Beijing Specific
    # Beijing Coordinates: 39.9042° N, 116.4074° E
    corner_data = [
        # x, y, text
        (100, HEIGHT-100, "N 39.9042°"),      # Top Left
        (WIDTH-100, HEIGHT-100, "E 116.4074°"), # Top Right
        (100, 100, "LOC: BEIJING"),           # Bottom Left
        (WIDTH-100, 100, "ZONE: UTC+08")      # Bottom Right
    ]
    
    for x, y, text in corner_data:
        ax.text(x, y, text, color=COLOR_PALETTE[0], 
                ha='center', va='center', fontproperties=font_props_small, alpha=0.6)
        # Crosshairs
        ax.plot([x-20, x+20], [y, y], color='white', alpha=0.5, linewidth=0.5)
        ax.plot([x, x], [y-20, y+20], color='white', alpha=0.5, linewidth=0.5)

def main():
    print("Generating canvas...")
    fig, ax = setup_canvas()
    
    print("Drawing geometry...")
    draw_radiant_geometry(ax)
    
    print("Drawing shapes...")
    draw_crystalline_shapes(ax)
    
    print("Adding typography...")
    draw_typography(ax)
    
    # Add a final "noise" overlay or grid for texture (simulated)
    # Simple grid
    for i in range(0, WIDTH, 100):
        ax.plot([i, i], [0, HEIGHT], color='white', alpha=0.03, linewidth=0.5)
    for i in range(0, HEIGHT, 100):
        ax.plot([0, WIDTH], [i, i], color='white', alpha=0.03, linewidth=0.5)

    print("Saving...")
    output_path = r"c:\Pm_Workspace\2026_poster.png"
    plt.savefig(output_path, dpi=DPI, bbox_inches='tight', pad_inches=0, facecolor=BG_COLOR)
    plt.close(fig)
    print(f"Poster saved to {output_path}")

if __name__ == "__main__":
    main()
