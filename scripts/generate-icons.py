"""Generate dependency-free PNG PWA icons from a simple original icon design.
Uses Python standard library only. The PNGs are created during GitHub Pages deploy.
"""
from pathlib import Path
import math
import struct
import zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "icons"
OUT.mkdir(exist_ok=True)

def mix(dst, src, opacity):
    return tuple(round(dst[i] * (1-opacity) + src[i]*opacity) for i in range(3))

def draw(size, maskable=False):
    scale = size / 512
    pixels = bytearray(size*size*4)
    def inside_round(x,y):
        r=112 if not maskable else 0
        if r==0: return True
        cx=max(r,min(512-r,x));cy=max(r,min(512-r,y))
        return (x-cx)**2+(y-cy)**2<=r*r
    def disk(x,y,cx,cy,r):
        return (x-cx)**2+(y-cy)**2<=r*r
    def line(x,y,x1,y1,x2,y2,width):
        vx=x2-x1;vy=y2-y1
        t=max(0,min(1,((x-x1)*vx+(y-y1)*vy)/(vx*vx+vy*vy)))
        return disk(x,y,x1+t*vx,y1+t*vy,width/2)
    def curve(x,y,points,width):
        return any(line(x,y,*points[i],*points[i+1],width) for i in range(len(points)-1))
    # In maskable variant all artwork is scaled inward, leaving a 10% safe border.
    shrink=0.78 if maskable else 1.0
    def pt(x,y):
        return (256+(x-256)*shrink,256+(y-256)*shrink)
    def circle(x,y,cx,cy,r):
        a,b=pt(cx,cy);return disk(x,y,a,b,r*shrink)
    def stroke(x,y,points,width):
        return curve(x,y,[pt(*p) for p in points],width*shrink)
    for py in range(size):
        y=(py+0.5)/scale
        for px in range(size):
            x=(px+0.5)/scale
            col=(15,118,110) if y<260 else (22,78,99)
            if not inside_round(x,y): col=(0,0,0)
            else:
                if circle(x,y,323,167,91):col=(255,242,201)
                if circle(x,y,363,124,91):col=(15,118,110)
                if circle(x,y,129,143,8) or circle(x,y,404,280,7):col=(255,242,201)
                if stroke(x,y,[(134,296),(161,263),(205,240),(255,233),(309,240),(353,263),(376,296)],20):col=(210,245,237)
                if circle(x,y,253,325,83):col=(255,224,189)
                if stroke(x,y,[(190,323),(207,337),(226,323)],10) or stroke(x,y,[(280,323),(297,337),(316,323)],10):col=(22,78,99)
                if stroke(x,y,[(225,364),(244,378),(263,379),(282,364)],9):col=(179,107,100)
                if y>395 and y<438 and circle(x,y,253,478,100):col=(182,238,225)
            offset=(py*size+px)*4
            pixels[offset:offset+4]=bytes((*col,255 if inside_round(x,y) else 0))
    raw=b"".join(b"\x00"+pixels[i:i+size*4] for i in range(0,len(pixels),size*4))
    def chunk(tag,data):
        return struct.pack(">I",len(data))+tag+data+struct.pack(">I",zlib.crc32(tag+data)&0xffffffff)
    data=b"\x89PNG\r\n\x1a\n"+chunk(b"IHDR",struct.pack(">IIBBBBB",size,size,8,6,0,0,0))+chunk(b"IDAT",zlib.compress(raw,9))+chunk(b"IEND",b"")
    return data

for filename,size,maskable in [("icon-192.png",192,False),("icon-512.png",512,False),("icon-maskable-512.png",512,True),("apple-touch-icon.png",180,False)]:
    target=OUT/filename
    target.write_bytes(draw(size,maskable))
    print(f"Created {target.relative_to(ROOT)} ({len(target.read_bytes())} bytes)")
