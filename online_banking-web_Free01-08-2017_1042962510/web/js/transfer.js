import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCS2jbtRL66n6chj7HaoO93Hc1lMiwj8XE",
  authDomain: "horizon-app-bfb68.firebaseapp.com",
  projectId: "horizon-app-bfb68",
  storageBucket: "horizon-app-bfb68.appspot.com",
  messagingSenderId: "730299809391",
  appId: "1:730299809391:web:eb2f9ef8d7ea2891cbd79a",
  measurementId: "G-1BMQ9354ED",
};
const app = initializeApp(firebaseConfig);

const transactionForm = document.getElementById("transactionFormBox");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Transactions", user.email);
  const docSnap = await getDoc(docRef);
  transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      transactionForm["beneficiaryAccount"].value == "" ||
      transactionForm["beneficiaryBank"].value == "" ||
      transactionForm["amount"].value == "" ||
      transactionForm["beneficiaryName"].value == "" ||
      transactionForm["recipientAddress"].value == "" ||
      transactionForm["bankAddress"].value == "" ||
      transactionForm["routingNumber"].value == "" ||
      transactionForm["swift"].value == "" ||
      transactionForm["currency"].value == "" ||
      transactionForm["transferPurpose"].value == ""
    ) {
      alert(`Empty Fields Not Allowed`);
    } else {
      var getDate = new Date();
      const account = transactionForm["beneficiaryAccount"].value;
      const name = transactionForm["beneficiaryName"].value;
      const bank = transactionForm["beneficiaryBank"].value;
      const amount = transactionForm["amount"].value;

      const recipientAddress = transactionForm["recipientAddress"].value;
      const bankAddress = transactionForm["bankAddress"].value;
      const routingNumber = transactionForm["routingNumber"].value;
      const swift = transactionForm["swift"].value;
      const currency = transactionForm["currency"].value;
      const transferPurpose = transactionForm["transferPurpose"].value;
      const recipientMessage = transactionForm["recipientMessage"].value;
      // if (docSnap.exists()) {
      updateDoc(docRef, {
        Transaction: arrayUnion({
          date: getDate.toLocaleString(),
          account: account,
          name: name,
          bank: bank,
          amount: amount,
          status: "Pending",
          recipientAddress: recipientAddress,
          bankAddress: bankAddress,
          routingNumber: routingNumber,
          swift: swift,
          currency: currency,
          transferPurpose: transferPurpose,
          recipientMessage: recipientMessage,
          transferType: "Wire Transfer",
        }),
      });

      Swal.fire({
        title: "Pending",
        text: "Transaction Pending",
        icon: "warning",
      });
      transactionForm.reset();
    }
  });
});
