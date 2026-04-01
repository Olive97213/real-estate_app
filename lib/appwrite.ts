import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from 'appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

// ----------------------------------------------------
// 🧩 Configuration Appwrite
// ----------------------------------------------------

export const config = {
  platform: 'com.jsm.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

// ----------------------------------------------------
// 🔗 Initialisation du client Appwrite
// ----------------------------------------------------

export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectId!);

// ----------------------------------------------------
// 🧑‍💻 Initialisation des modules
// ----------------------------------------------------

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

// ----------------------------------------------------
// 🔐 Login OAuth2 avec la nouvelle syntaxe
// ----------------------------------------------------

export async function login() {
  try {
    // 1️⃣ Générer l'URL de redirection Expo
    const redirectURI = Linking.createURL('/');

    // 2️⃣ Construire manuellement l'URL avec le flow TOKEN
    const oauthUrl = `${config.endpoint}/account/tokens/oauth2/${OAuthProvider.Google}?project=${config.projectId}&success=${encodeURIComponent(redirectURI)}&failure=${encodeURIComponent(redirectURI)}`;

    // 3️⃣ Ouvrir dans le navigateur in-app
    const browserResult = await openAuthSessionAsync(oauthUrl, redirectURI);

    // 4️⃣ Vérifier le résultat
    if (browserResult.type !== 'success') {
      return false;
    }

    // 5️⃣ Parser l'URL avec les 2 méthodes
    const url = new URL(browserResult.url);
    let userId = url.searchParams.get('userId');
    let secret = url.searchParams.get('secret');

    // Fallback : essayer avec Linking.parse si URL ne trouve rien
    if (!userId || !secret) {
      const parsedUrl = Linking.parse(browserResult.url);
      userId = parsedUrl.queryParams?.userId as string;
      secret = parsedUrl.queryParams?.secret as string;
    }

    if (!userId || !secret) {
      console.error('⚠️ Paramètres OAuth manquants');
      console.error('URL complète:', browserResult.url);
      return false;
    }

    console.log('✅ Création de la session...');

    // 6️⃣ Créer la session avec les credentials
    await account.createSession(userId, secret);

    console.log('🎉 Authentification réussie !');
    return true;
  } catch (error) {
    console.error('❌ Erreur login:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
    return false;
  }
}

// ----------------------------------------------------
// 🚪 Déconnexion
// ----------------------------------------------------

export async function logout() {
  try {
    await account.deleteSession('current');
    console.log('✅ Déconnexion réussie');
    return true;
  } catch (error) {
    console.error('❌ Erreur logout:', error);
    return false;
  }
}

// ----------------------------------------------------
// 👤 Récupération utilisateur actuel
// ----------------------------------------------------

export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.error('❌ Erreur getCurrentUser:', error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderDesc('$createdAt'), Query.limit(5)]
    );

    return response.documents;
  } catch (error) {
    console.log('Error fetching latest properties:', error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];

    // filtre type
    if (filter && filter !== 'All') {
      buildQuery.push(Query.equal('type', filter));
    }

    // recherche
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ])
      );
    }

    // limite
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );

    return result.documents;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// write function to get property by id
export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ----------------------------------------------------
// 🔍 Vérifier si l'utilisateur est connecté
// ----------------------------------------------------

export async function isAuthenticated() {
  try {
    await account.get();
    return true;
  } catch {
    return false;
  }
}
