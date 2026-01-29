import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'presentation-app',
    base: './', // Ensure relative paths for assets
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'presentation-app/index.html'),
                slide01: resolve(__dirname, 'presentation-app/slide01.html'),
                slide01B: resolve(__dirname, 'presentation-app/slide01B.html'),
                slide01C: resolve(__dirname, 'presentation-app/slide01C.html'),
                slide01D: resolve(__dirname, 'presentation-app/slide01D.html'),
                slide01E: resolve(__dirname, 'presentation-app/slide01E.html'),
                slide02: resolve(__dirname, 'presentation-app/slide02.html'),
                slide03: resolve(__dirname, 'presentation-app/slide03.html'),
                slide04: resolve(__dirname, 'presentation-app/slide04.html'),
                slide05: resolve(__dirname, 'presentation-app/slide05.html'),
                slide06: resolve(__dirname, 'presentation-app/slide06.html'),
                slide07: resolve(__dirname, 'presentation-app/slide07.html'),
                slide08: resolve(__dirname, 'presentation-app/slide08.html'),
                slide09: resolve(__dirname, 'presentation-app/slide09.html'),
                slide010: resolve(__dirname, 'presentation-app/slide010.html'),
                slide011: resolve(__dirname, 'presentation-app/slide011.html'),
                slide012: resolve(__dirname, 'presentation-app/slide012.html'),
                slide013: resolve(__dirname, 'presentation-app/slide013.html'),
                slide_final: resolve(__dirname, 'presentation-app/slide_final.html'),
                slide_new: resolve(__dirname, 'presentation-app/slide_new.html'),
                slide_new2: resolve(__dirname, 'presentation-app/slide_new2.html'),
                slide_new3: resolve(__dirname, 'presentation-app/slide_new3.html'),
                slide_new4: resolve(__dirname, 'presentation-app/slide_new4.html'),
                slide_new5: resolve(__dirname, 'presentation-app/slide_new5.html'),
                slide_new6: resolve(__dirname, 'presentation-app/slide_new6.html'),
                slide_new7: resolve(__dirname, 'presentation-app/slide_new7.html'),
            },
        },
    },
})
