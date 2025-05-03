import { useState, useMemo, useEffect } from "react";
import { PlusCircle, Trash2, Eye, EyeOff, Search, Key, Edit } from "lucide-react";
import Navbar from "../components/Navbar";

// User roles constants
const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Responsable",
  VISITOR: "Visiteur"
};

// Initial new user state
const INITIAL_USER_STATE = {
  name: "",
  email: "",
  password: "",
  role: ROLES.VISITOR
};

// Initial password state
const INITIAL_PASSWORD_STATE = {
  newPassword: "",
  
};

export default function Users() {
  // Layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  // Users data state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [showUsers, setShowUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [userForm, setUserForm] = useState(INITIAL_USER_STATE);
  const [passwordForm, setPasswordForm] = useState(INITIAL_PASSWORD_STATE);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call
        const mockUsers = [
          {
            id: "1",
            name: "ARAB MEHDI",
            email: "arabmalek@gmail.com",
            password:"mehdi123",
            role: ROLES.VISITOR,
            status: "active",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          {
            id: "2",
            name: "CHADI ZINEB",
            email: "chadizineb@gmail.com",
            password:"zineb123",
            role: ROLES.ADMIN,
            status: "active",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          {
            id: "3",
            name: "HASNAOUI TAHAR",
            email: "hasnaouitahar@gmail.com",
            password: "tahar123",
            role: ROLES.MANAGER,
            status: "inactive",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  // Add or update user
  const handleSubmitUser = () => {
    if (!userForm.name || !userForm.email) return;

    if (isEditing && selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...userForm } : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: (users.length + 1).toString(),
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        role: userForm.role,
        status: "active",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      };
      setUsers([...users, newUser]);
    }

    resetForms();
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      password : user.password,
      role: user.role
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Change password
  const handleChangePassword = (user) => {
    setSelectedUser(user);
    setIsPasswordDialogOpen(true);
  };

  // Submit password change
  const handlePasswordSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères!");
      return;
    }

    // Here you would typically make an API call to update the password
    console.log(`Password updated for user: ${selectedUser.name}`);
    setIsPasswordDialogOpen(false);
    resetForms();
  };

  // Reset all forms and dialogs
  const resetForms = () => {
    setUserForm(INITIAL_USER_STATE);
    setPasswordForm(INITIAL_PASSWORD_STATE);
    setSelectedUser(null);
    setIsEditing(false);
    setIsDialogOpen(false);
    setIsPasswordDialogOpen(false);
  };

  // Toggle user visibility
  const toggleUserVisibility = () => {
    setShowUsers(!showUsers);
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">Erreur: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex-row w-full max-w-6xl mx-auto bg-white rounded-lg border shadow-sm">
            {/* Card Header */}
            <div className="p-6 flex flex-row items-center justify-between border-b">
              <div className="px-4 py-3 flex justify-between w-50">
                <h2 className="text-2xl font-semibold">Utilisateurs</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-md border bg-transparent hover:bg-gray-100 transition-colors"
                  onClick={toggleUserVisibility}
                  aria-label={showUsers ? "Masquer les utilisateurs" : "Afficher les utilisateurs"}
                >
                  {showUsers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>

                <button
                  className="flex items-center gap-1 px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 transition-colors"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Ajouter Utilisateur</span>
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des utilisateurs..."
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {showUsers && (
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-gray-50">
                            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Utilisateur</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Rôle</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b transition-colors hover:bg-gray-50">
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                      <img
                                        src={user.avatarUrl || "/placeholder.svg"}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          e.target.style.display = "none";
                                          e.target.nextSibling.style.display = "flex";
                                        }}
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 font-medium">
                                        {user.name.substring(0, 2).toUpperCase()}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="font-medium">{user.name}</div>
                                      <div className="text-sm text-gray-500">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 align-middle">{user.role}</td>
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-2">
                                    <button
                                      className="p-2 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                                      onClick={() => handleEditUser(user)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Modifier Utilisateur</span>
                                    </button>
                                    <button
                                      className="p-2 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                                      onClick={() => handleChangePassword(user)}
                                    >
                                      <Key className="h-4 w-4" />
                                      <span className="sr-only">Changer mot de passe</span>
                                    </button>
                                    <button
                                      className="p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                                      onClick={() => handleDeleteUser(user.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Supprimer Utilisateur</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="h-24 text-center">
                                Aucun utilisateur trouvé.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {!showUsers && (
                  <div className="flex items-center justify-center h-24 border rounded-md bg-gray-50">
                    <p className="text-gray-500">La liste des utilisateurs est masquée. Cliquez sur l'icône pour afficher.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add/Edit User Dialog */}
            {isDialogOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">
                      {isEditing ? "Modifier Utilisateur" : "Ajouter un Nouveau Utilisateur"}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nom
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={userForm.name}
                          onChange={handleInputChange}
                          placeholder="Entrer votre Nom"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={userForm.email}
                          onChange={handleInputChange}
                          placeholder="Entrer votre Email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">
                          Mot de passe
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={userForm.password}
                          onChange={handleInputChange}
                          placeholder="Entrer votre Mot de passe"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Rôle
                        </label>
                        <select
                          id="role"
                          name="role"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={userForm.role}
                          onChange={handleInputChange}
                        >
                          <option value={ROLES.ADMIN}>Admin</option>
                          <option value={ROLES.MANAGER}>Responsable</option>
                          <option value={ROLES.VISITOR}>Visiteur</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t flex justify-end gap-2">
                    <button
                      className="px-4 py-2 border rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors"
                      onClick={resetForms}
                    >
                      Annuler
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmitUser}
                      disabled={!userForm.name || !userForm.email}
                    >
                      {isEditing ? "Mettre à jour" : "Ajouter Utilisateur"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Change Password Dialog */}
            {isPasswordDialogOpen && selectedUser && (
              <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Changer Mot de Passe</h3>
                    <p className="text-sm text-gray-500 mt-1">Changer le mot de passe de {selectedUser.name}</p>
                  </div>

                  <div className="p-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="newPassword" className="text-sm font-medium">
                          Nouveau Mot de Passe
                        </label>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Entrer Nouveau Mot de Passe"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirmer Mot de Passe
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirmer Nouveau Mot de Passe"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t flex justify-end gap-2">
                    <button
                      className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                      onClick={resetForms}
                    >
                      Annuler
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handlePasswordSubmit}
                      disabled={!passwordForm.newPassword || !passwordForm.confirmPassword}
                    >
                      Changer Mot de Passe
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}