let express = require('express');
let app = express();
// serve files from the static directory
app.use(express.static('./static'));

app.listen(3000, () => console.log('Server running on PORT 3000'));
