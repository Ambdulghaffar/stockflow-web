# Schéma de Base de Données - StockFlow Web

## Vue d'ensemble
Ce document décrit le schéma de base de données pour l'application StockFlow Web, un système de gestion de stock avec authentification utilisateur.

## Tables Principales

### 1. Table `users`
Table des utilisateurs du système avec gestion des rôles.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique de l'utilisateur |
| `username` | VARCHAR(50) | NOT NULL | Nom d'utilisateur |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Adresse email unique |
| `phone` | VARCHAR(20) | UNIQUE | Numéro de téléphone |
| `address` | TEXT | NULL | Adresse complète |
| `password` | VARCHAR(255) | NOT NULL | Mot de passe hashé |
| `role` | ENUM | NOT NULL | Rôle de l'utilisateur (UserRole enum) |
| `created_at` | TIMESTAMP | NOT NULL | Date de création |
| `updated_at` | TIMESTAMP | NULL | Date de modification |

**Index :**
- INDEX `idx_users_email` sur `email`
- INDEX `idx_users_username` sur `username`
- INDEX `idx_users_phone` sur `phone`
- INDEX `idx_users_role` sur `role`

---

### 2. Table `categories`
Table des catégories de produits.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique de la catégorie |
| `name` | VARCHAR(255) | NOT NULL, UNIQUE | Nom de la catégorie |
| `description` | VARCHAR(500) | NULL | Description de la catégorie |
| `image_url` | VARCHAR(500) | NULL | URL de l'image de la catégorie |
| `created_at` | TIMESTAMP | NULL | Date de création |
| `updated_at` | TIMESTAMP | NULL | Date de modification |

**Index :**
- INDEX `idx_categories_name` sur `name`

---

### 3. Table `products`
Table principale des produits avec gestion du stock.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique du produit |
| `name` | VARCHAR(255) | NOT NULL | Nom du produit |
| `description` | VARCHAR(1000) | NULL | Description détaillée |
| `price` | DECIMAL(10,2) | NOT NULL | Prix unitaire |
| `stock` | INTEGER | NOT NULL | Quantité en stock |
| `image_url` | VARCHAR(500) | NULL | URL de l'image principale |
| `category_id` | INTEGER | NOT NULL, FOREIGN KEY → categories(id) | Catégorie du produit |
| `status` | ENUM | NOT NULL | Statut du produit (ProductStatus enum) |
| `created_at` | TIMESTAMP | NULL | Date de création |
| `updated_at` | TIMESTAMP | NULL | Date de modification |

**Index :**
- INDEX `idx_products_category_id` sur `category_id`
- INDEX `idx_products_status` sur `status`

---

### 4. Table `product_images` (Optionnel - Extension future)
Table pour gérer plusieurs images par produit.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique |
| `product_id` | INTEGER | NOT NULL, FOREIGN KEY → products(id) | Produit associé |
| `image_url` | VARCHAR(500) | NOT NULL | URL de l'image |
| `alt_text` | VARCHAR(255) | NULL | Texte alternatif |
| `is_primary` | BOOLEAN | NOT NULL, DEFAULT FALSE | Image principale |
| `sort_order` | INTEGER | NOT NULL, DEFAULT 0 | Ordre d'affichage |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date de création |

---

### 5. Table `audit_logs` (Recommandé - Traçabilité)
Table pour tracer les actions importantes du système.

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Identifiant unique |
| `user_id` | INTEGER | NULL, FOREIGN KEY → users(id) | Utilisateur concerné |
| `action` | VARCHAR(100) | NOT NULL | Action effectuée |
| `entity_type` | VARCHAR(50) | NOT NULL | Type d'entité (user, product, category) |
| `entity_id` | INTEGER | NOT NULL | ID de l'entité |
| `old_values` | JSON | NULL | Valeurs avant modification |
| `new_values` | JSON | NULL | Valeurs après modification |
| `ip_address` | VARCHAR(45) | NULL | Adresse IP |
| `user_agent` | TEXT | NULL | User agent du navigateur |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP | Date de l'action |

---

## Relations entre les tables

```
users (1) ────┐
              │
              ├───→ categories (created_by)
              │
              └───→ products (created_by)

categories (1) ────→ products (category_id)

categories (parent_id) ────→ categories (self-reference)
```

## Contraintes et Règles Métier

### Règles de Validation
1. **Email unique** : Un email ne peut être utilisé que par un seul utilisateur
2. **SKU unique** : Chaque produit doit avoir un SKU unique
3. **Stock positif** : La quantité en stock ne peut pas être négative
4. **Prix positif** : Le prix doit être supérieur à 0
5. **Hiérarchie de catégories** : Une catégorie ne peut pas être parente d'elle-même
6. **Soft delete** : Utilisation du champ `is_active` au lieu de supprimer physiquement

### Permissions par Rôle
- **ADMIN** : Accès complet à toutes les fonctionnalités
- **MANAGER** : Gestion des produits et catégories, lecture des utilisateurs
- **CLIENT** : Lecture seule des produits et catégories

## Bonnes Pratiques Appliquées

### 1. **Normalisation**
- Tables bien normalisées (3NF)
- Élimination de la redondance des données
- Relations claires avec clés étrangères

### 2. **Indexation**
- Index sur les colonnes fréquemment recherchées
- Index composites pour les requêtes complexes
- Index sur les clés étrangères

### 3. **Types de Données Appropriés**
- Utilisation de DECIMAL pour les prix (précision)
- VARCHAR avec longueurs appropriées
- TIMESTAMP pour les dates
- BOOLEAN pour les flags

### 4. **Contraintes d'Intégrité**
- Clés primaires auto-incrémentées
- Clés étrangères avec CASCADE/RESTRICT approprié
- Contraintes NOT NULL sur les champs obligatoires
- Valeurs par défaut sensées

### 5. **Audit et Traçabilité**
- Timestamps created_at/updated_at sur toutes les tables
- Table d'audit pour les actions sensibles
- Suivi des modifications avec old_values/new_values

### 6. **Performance**
- Index stratégiques pour les requêtes fréquentes
- Pagination côté serveur
- Cache des données fréquemment accédées

### 7. **Sécurité**
- Mots de passe hashés (bcrypt)
- Soft delete au lieu de hard delete
- Validation côté base de données
- Logs d'audit pour la traçabilité

### 8. **Évolutivité**
- Structure prête pour l'ajout de nouvelles fonctionnalités
- Champs réservés pour les extensions futures
- Support des sous-catégories
- Gestion multi-images

## Migration et Déploiement

### Ordre de création des tables :
1. `users` (pas de dépendances)
2. `categories` (dépend de users pour created_by)
3. `products` (dépend de categories et users)
4. `product_images` (dépend de products)
5. `audit_logs` (dépend de users)

### Scripts de migration recommandés :
- Utiliser des outils comme Flyway ou Liquibase
- Versionner les migrations
- Tests automatisés des migrations

## Évolutions Futures Possibles

1. **Gestion des commandes** (orders, order_items)
2. **Gestion des fournisseurs** (suppliers)
3. **Gestion des promotions** (promotions, discounts)
4. **Gestion des inventaires** (inventory_movements)
5. **Système de notifications** (notifications)
6. **API e-commerce** (customers, carts, wishlists)

---

*Ce schéma respecte les bonnes pratiques de conception de bases de données et est optimisé pour les performances et la maintenabilité.*