/*
* vue-meta插件的相关配置
* */
export default {
    meta:[
        { charset: 'utf-8' },
        {
            'http-equiv': 'X-UA-Compatible',
            'content': 'IE=edge',
        },
        {
            'name': 'viewport',
            'content': 'width=device-width,initial-scale=1.0',
        }
    ],
    link: [
        // { rel: 'icon', href: '//static.o-home.com/v2/image/layouts/ohome.ico' }
        { rel: 'icon', href: '//static.test.o-home.com/monitor/img/logo.ico' }
    ],
    htmlAttrs: {
        lang: 'zh'
    },
}
