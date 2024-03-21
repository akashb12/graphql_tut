const { UserList, MovieList } = require("../fakeData")

const resolvers = {
    Query: {
        users: () => {
            return UserList;
        },
        user: (parent,args) => {
            let data = UserList.find((item)=> item.id == Number(args.id));
            return data
        },
        movies: () => {
            return MovieList;
        },
        movie: (parent,args) => {
            let data = MovieList.find((item)=> item.name == args.name);
            return data
        },
    },
    User: {
        favoriteMovies: () => {
            let data = MovieList.filter((item)=> item.yearOfPublication > 2000 && item.yearOfPublication < 2010);
            return data;
        },
    },
    Mutation: {
        createUser: (parent,args) => {
            let user = args.input;
            let lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUser: (parent,args) => {
            let user = args.input;
            let index = UserList.findIndex((item)=> item.id == user.id);
            if(index != -1) {
                UserList[index].username = user.username;
                return UserList[index];
            }
        },
        deleteUser: (parent,args) => {
            let index = UserList.findIndex((item)=> item.id == args.id);
            UserList.splice(index,1)
            return null;
        }
    }
};
module.exports={resolvers};