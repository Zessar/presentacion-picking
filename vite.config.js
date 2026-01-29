import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                slide01: resolve(__dirname, 'slide01.html'),
                slide01B: resolve(__dirname, 'slide01B.html'),
                slide01C: resolve(__dirname, 'slide01C.html'),
                slide01D: resolve(__dirname, 'slide01D.html'),
                slide01E: resolve(__dirname, 'slide01E.html'),
                slide02: resolve(__dirname, 'slide02.html'),
                slide03: resolve(__dirname, 'slide03.html'),
                slide04: resolve(__dirname, 'slide04.html'),
                slide05: resolve(__dirname, 'slide05.html'),
                slide06: resolve(__dirname, 'slide06.html'),
                slide07: resolve(__dirname, 'slide07.html'),
                slide08: resolve(__dirname, 'slide08.html'),
                slide09: resolve(__dirname, 'slide09.html'),
                slide010: resolve(__dirname, 'slide010.html'),
                slide011: resolve(__dirname, 'slide011.html'),
                slide012: resolve(__dirname, 'slide012.html'),
                slide013: resolve(__dirname, 'slide013.html'),
                slide_final: resolve(__dirname, 'slide_final.html'),
                slide_new: resolve(__dirname, 'slide_new.html'),
                slide_new2: resolve(__dirname, 'slide_new2.html'),
                slide_new3: resolve(__dirname, 'slide_new3.html'),
                slide_new4: resolve(__dirname, 'slide_new4.html'),
                slide_new5: resolve(__dirname, 'slide_new5.html'),
                slide_new6: resolve(__dirname, 'slide_new6.html'),
                slide_new7: resolve(__dirname, 'slide_new7.html'),
            },
        },
    },
})
