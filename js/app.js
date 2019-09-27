$(function () {
  $("#search").submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const query = $("#query").val()
    console.log(query)
    $('#results-table tbody').html('')
    $('#query').val('')
    search(query)
  })

  function displayResults (gifs) {
    gifs.forEach((gif) => {
      $("#results-table tbody").append(
        `<tr>
          <td>${gif.title}</td>
          <td><img src="${gif.images.fixed_height.url}"></td>
          <td>${gif.rating}</td>
          <td><a href="${gif.url}"> link </a></td>
        </tr>`
      )
    })
  }

  function search(searchTerm) {
    const url = 'https://api.giphy.com/v1/gifs/search'
    const apiKey = process.env.GIPHY_API_KEY
    $.ajax({
        url: url,
        type: "GET",
        data: { q: searchTerm, api_key: apiKey, limit: 50 }
      })
      .done((response) => {
        // execute this function if request is successful
        displayResults(response.data)
      })
      .fail(() => {
        // execute this function if request fails
        alert('error occurred')
    })

  }
})
