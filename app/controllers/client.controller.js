const db = require("../models");
const Client = db.clients;

const { sendMailResetPassword } = require("../services/mailer.js");

const bcrypt = require('bcrypt');

const { generatePassword } = require("../services/generatePassword.js"); // Importez correctement generatePassword
var saltRounds = 10;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.password|| !req.body.phone) {
      return res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Hash the password
  //  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

    // Create a client object
    const client = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    };

    // Save the client in the database
    const data = await Client.create(client);
    return res.send({ client: data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the client."
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(401).json({ error: "User does not exist" });
    }
   // const validPassword = await bcrypt.compare(password, client.password);


    if (!password) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    return res.status(200).json(client);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Client.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => {
      if (data) {
        res.send({ "client": data });
      } else {
        res.status(404).send({ "client": null });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

  Client.destroy({
    where: { id: req.params.id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};


//get client by phone
exports.getClientByPhone = (req, res) => {
  const phone = req.body.phone;
console.log("phone"+phone);
  Client.findOne({
    where: { phone: req.body.phone }
  })
    .then(data => {
      if (data) {
        res.send({ "client": data });
      } else {
        res.status(404).send({
          "client": null
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Client with phone=" + phone
      });
    });
};
//send email
exports.forgot = async (req, res) => {
  try {
    const client = await Client.findOne({ where: { email: req.body.email } });
    if (client) {
      const verificationcode = generatePassword(); // Utilisez generatePassword correctement
      sendMailResetPassword(client.email, verificationcode); // Utilisez sendMailResetPassword correctement
      res.status(200).json({ key: "key", value: verificationcode });
      console.log("test", verificationcode);
    } else {
      res.status(500).json({ message: "No account with this email to restore" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};
//restorPassword
// exports.restorPassword = async (req, res) => {
//   const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
//   try {
//     const updatedClient = await Client.findOneAndUpdate(
//       { email: req.body.email },
//       { password: hashedPwd },
//       { new: true }
//     );

//     if (updatedClient) {
//       console.log(req.body.email);
//       res.status(200).json({ message: "Password has been changed successfully" });
//     } else {
//       // Handle the case where no matching client is found
//       res.status(404).json({ message: "Client not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports. updatePasswordByEmail = async (email, newPassword) => {
  try {
    // Vérifiez si l'utilisateur existe avec l'email donné
    const user = await Client.findOne({ email });

    if (!user) {
      return { success: false, message: 'Utilisateur introuvable' };
    }

    // Générez le hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Utilisez un sel approprié (ici, 10 tours)

    // Mettez à jour le mot de passe de l'utilisateur
    await Client.updateOne({ email }, { password: hashedPassword });

    return { success: true, message: 'Mot de passe mis à jour avec succès' };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    return { success: false, message: 'Erreur serveur' };
  }
};