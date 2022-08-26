const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use((req,res,next)=>{
  console.log('Hello from middleware!!!')
  next()
})

app.use((req,res,next)=> {
  req.requestTime = new Date().toISOString();
  next()
})

tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Route handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  // if(id > tours.length || id < 0){
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (+(req.params.id > tours.length)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

deleteTour = (req, res) => {
  if (+(req.params.id > tours.length)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req,res)=>{
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const createUser = (req,res)=>{
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const getUser = (req,res)=>{
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const updateUser = (req,res)=>{
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}

const deleteUser = (req,res)=>{
  res.status(505).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
}


//Routes

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router()
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
