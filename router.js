const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  

  if(url === '/'){
    res.write(`
      <html>
        <h1>Hello Node!</h1>
        <a href="/read-reading">Read message</a>
        <br />
        <a href="/write-message">Write Message</a>
      </html>
    `)
    return res.end() 
  }
          
    if(url === '/read-reading'){ 
      fs.readFileSync('text.txt', 'utf8',(err,text) => {
        // if(err) throw error
        console.log(text)
        // return text
        res.write(
          `
          <html>
          ${text}
          <a href="/read-reading">TOP</a>
          <br />
          <a href="/write-message">Write Message</a>
        </html>
          `
        )
      });
    return res.end() 

  }

  if(url === '/write-message'){
    res.write(`
        <html>
            <form action="/message" method="POST">
              <label>Message</label>
              <input type="text" placeholder="Message" name="message">
              <button type="submit">SUBMIT</button>
            </form>
            <a href="/read-message">Read Message</a>
        <a href="/">TOP</a>
        </html>
    `)
    return res.end() 
  }

  if(url === '/message' && method === 'POST'){

    const body = []

    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk)
    })
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        // console.log(parsedBody);
        const message = parsedBody.split('=')[1]
        fs.writeFile('text.txt', message, (err) => {
            if(err) throw error
            res.statusCode = 302
            res.setHeader('Location', '/write-message')
            return res.end()
        })
    }) 
}
}

module.exports = requestHandler