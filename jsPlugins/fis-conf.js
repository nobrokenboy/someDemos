var files='/public';
fis.match("*",{
    useHash: false,
    deploy: fis.plugin('local-deliver', {
        to: './output'
    
    })
});

fis.match('*.js', {
    parser: fis.plugin('translate-es6',{
        // presets: ['env']
    }),
    release:files+"$0",
})