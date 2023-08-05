import { ApolloServer } from "apollo-server-express";
import express from "express";

const app = express();
const PORT = 5000;

const startApolloServer = async () => {
  // const server = new ApolloServer({
  //   // schema: schema,
  //   // context: context,
  // });
  // await server.start();
  // server.applyMiddleware({ app, path: "/graphql" });
  // console.log(
  //   `apollo server is running at http://localhost:${PORT}${server.graphqlPath}`
  // );
};
startApolloServer();

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
