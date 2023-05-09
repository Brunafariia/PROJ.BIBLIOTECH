import { addDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { emprestimosCollection } from "./collections";

export async function adicionarEmprestimo(data) {
    await addDoc(emprestimosCollection, data);
}

export async function getEmprestimos() {
    const snapshot = await getDocs(emprestimosCollection);
    let emprestimos = [];
    snapshot.forEach(doc => {
        emprestimos.push({...doc.data(), id: doc.id});
    });
    return emprestimos;
}

export async function getEmprestimo(id) {
    const document = await getDoc(doc(emprestimosCollection, id));
    return {...document.data(), id: document.id};
}

export async function updateEmprestimo(id, data) {
    await updateDoc(doc(emprestimosCollection, id), data);
}

export async function queryEmprestimos(propriedade, ordem, limite) {
    const q = query(emprestimosCollection, orderBy(propriedade, ordem), limit(limite));
    let emprestimos = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        emprestimos.push({...doc.data(), id: doc.id});
    });
    return emprestimos;
}