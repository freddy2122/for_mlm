# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


Informations back-end du projet FOR MLM

Envoie des données par API

Authentification

-Installation de Laravel passport
-Système d'authentification, vérification d'email avec envoie de code pour confirmation
 endpoint : POST , préfixer de account(register,resend-code,confirm,connect,reset-password,confirm-password)
- possibilité de modifier le profile, type de compte
endpoint : POST , préfixer de account(edit-profile/{slug},type_compte_update/{user}

Boutique
un stokiste peu créer une boutique 
endpoint : POST(shop-create)
modifier les informations de sa boutique 
endpoint : POST(update_store/{id})
ajouter des produits des existants à sa boutique 
endpoint: POST(add-products)
pourra supprimer des produits de sa boutique 
endpoint: DELETE(/delete/{boutiqueId}/{produitId})
voir les détails de sa boutique 
endpoint: GET(/shop_show/{slug})
les utilisateurs pourront voir la liste des stockistes et en faire le choix de contacter, voir aussi leur boiutique
endpont: GET(/stockist,/shop_all)
ils pourront ajouter au panier et passer leur commandes
endpoint: POST(add-to-cart,orders)


Administration 

l'administrateur pourra voir les statistiques, la liste des produits, voir les détails du ^roduit, et les créer, modifier un produit ou le supprimer,
endpoint: GET(/admin,/admin/product,/admin/product/{id})
endpoint: POST(/admin/product)
endpoint: PUT(/admin/product/{id})

Modifier ses informations personnelles

endpoint: POST(/admin/profile)
endpoint: PUT(/admin/profile/{maj})

Voir assigner  des rôles aux utilisateurs
endpoint: POST(/admin/list/{user})

voir la liste des utilisateurs en fonction de leurs rôles
endpoint: GET(/admin/grossiste,/admin/stockiste,/admin/profile)

Ajouter des slides 
endpoint: POST(/slides)

Modifier un slide
endpoint: PUT(/slides/update/{id})

Supprimer un slide
endpoint: GET(/slides/{id})

Ajouter des actualité
endpoint: POST(news)

Détail actualité
endpoint: GET(news/{id})

éditer une actualité
endpoint: GET(news/{id}/edit)
endpoint: PUT(news/{id})

suppimer une actualité
endpoint: GET(news/delete/{id})
