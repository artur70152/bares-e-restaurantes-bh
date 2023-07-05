import Places from '../models/Places';

class ProductsController {

    async addplace(req, res) {
        console.log('requserId')
        console.log(req.userId)
        const  id  = req.userId
        
        const {nome,tipo,endereço,preços}=req.body

        const existingPlace = await Places.findOne({ where: { nome: nome, id: id } });

        if (existingPlace) {
          return res.status(400).json({ error: 'Place already exists, edit it instead' });
        }



await Places.create({
    id: id,
    nome,
    tipo,
    endereço,
    preços
})

return res.json({id,nome,tipo,endereço,preços})

    }





  async updateplace(req, res) {
   // const { name } = req.params;
    const {nome,endereço,preços} = req.body;
    console.log(req.body)
    const  id  = req.userId
    try {
      const product = await Places.findOne({  where: {
        nome: nome,
        id: id
      } });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (preços) {
        product.preços = preços;
      }
      if (endereço) {
        product.endereço = endereço;
      }
     

      // Salve as alterações no banco de dados
      await product.save();
      console.log(product); // Verifica o produto atualizado

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to update product' });
    }
  }

  async index(req, res) {

    const  id  = req.userId
    const products = await Places.findAll({  where: {
        
        id: id
      } });

    return res.json(products);
  }
  
  async index2(req, res) {

    
    const products = await Places.findAll();

    return res.json(products);
  }




}

export default new ProductsController();