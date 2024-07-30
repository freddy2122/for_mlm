export default function Carousel() {
  return (
    <>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
      </head>


      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/sales-sell-selling-commerce-costs-profit-retail-concept.jpg" className="d-block w-100" style={{ height: '600px' }} alt="http://www.w3.org/2000/svg" />
          </div>
          <div className="carousel-item">
            <img src="/img/textiles-sale.jpg" className="d-block w-100" style={{ height: '600px' }} alt="http://www.w3.org/2000/svg" />
          </div>
          <div className="carousel-item">
            <img src="/img/sales-sell-selling-commerce-costs-profit-retail-concept.jpg" className="d-block w-100" style={{ height: '600px' }} alt="http://www.w3.org/2000/svg" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}