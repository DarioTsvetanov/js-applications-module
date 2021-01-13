window.addEventListener('load', () => {

    const app = Sammy('#main', function(context) {
        //this === Sammy.Application
        this.get('index.html', function(context) {
            //this == Sammy.EventContext
            this.render('')
                .then(function(context) {
                    //this === Sammy.RenderContext
                })
        })
    })  

    app.run();
});