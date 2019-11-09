import { Clientes } from "./db";
import { rejects } from "assert";

//resolver
export const resolvers = {
  Query: {
    getCliente: (root,{ id }) => {
      return new Promise((resolve,object)=>{
		Clientes.findById(id,(error,cliente)=>{
			if (error) rejects(error)
			else resolve(cliente)
		})
	})
    },
    getClientes:(root,{limite})=>{
        return Clientes.find({}).limit(limite)
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = new Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        tipo: input.tipo,
        pedidos: input.pedidos,
        emails: input.emails
      });
      console.log(nuevoCliente);

      nuevoCliente.id = nuevoCliente._id;
      return new Promise((resolve, object) => {
        nuevoCliente.save(error => {
          if (error) rejects(error);
          else resolve(nuevoCliente);
        });
      });
    }
  }
};

// export default resolvers
