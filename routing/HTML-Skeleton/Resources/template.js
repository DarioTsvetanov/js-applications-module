const furnitureItemTemplate = (data) => `
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
            <div class="card-body">
                <blockquote class="card-blockquote">
                    <div><img style="width: 300px; height: 300px;" src="${data.image}"/></div>
                    <p>${data.description}</p>
                    <footer>Someone famous in
                    <cite title="Source Title">${data.make}</cite>
                    </footer>
                    <div class="pull-right">
                    <a href=”#” class="btn btn-info">Details</a>
                    </div>
                </blockquote>
            </div>
            </div>
        </div>
    </div>
`