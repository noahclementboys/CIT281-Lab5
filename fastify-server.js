const fastify = require("fastify")();

const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
];

fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
    console.log(request.params)
    const {id} = request.params 
    let student  = null;
    for (const item of students){
      if(item.id === parseInt(id)){
        student = item;
        break;

      }
    }
    if (!student){
      reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Route not found</h1>");
    };
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(student);
});

fastify.post("/cit/student", (request, reply) => {
    //console.log(request.body)
    const {first, last} = request.body;
    if(!last || !first){
      reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Route not found</h1>");

    }else{
      let id = 0;
      for(const student of students){
        if(student.id > id){
          id = student.id;
        }
      }
      id++;
      students.push((id, last, first));
      reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students[students.length -1]);
    }
    let response = request.body;
    reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(response);
});

fastify.get("*", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("<h1>Route not found</h1>");
});


// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});