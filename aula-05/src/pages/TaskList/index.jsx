import { useState, useEffect } from "react";
import axios from "axios";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask";

const url = "https://6542c27001b5e279de1f8a8c.mockapi.io/tasklist";

const TaskList = () => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prova, setProva] = useState(false);

  //   function cadastrar(){}
  const cadastrar = async () => {
    const task = {
      title: novaTarefa,
      description: "description",
      prioridade: "alta",
      done: false,
    };

    try {
      const { data } = await axios.post(url, task);
      console.log(data);
      // console.log([...tarefas, novaTarefa]); FORMA ANTIGA
      setTarefas([...tarefas, data]);
      setNovaTarefa("");
    } catch (err) {
      console.log(err);
    }
  };

  const excluirTarefa = async (id) => {
    console.log("Excluir Tarefa: ", id);
    try {
      const { data } = await axios.delete(`${url}/${id}`);
      console.log(data);
      // const arrayFiltrado = tarefas.filter((item) => item.id != data.id);
      const arrayFiltrado = tarefas.filter((item) => item.id != id);
      setTarefas(arrayFiltrado);
    } catch (err) {
      console.log(err);
    }
  };

  // async function getTasks(){}
  const getTasks = async () => {
    setLoading(true);
    try {
      // const dados = await fetch(
      //   "https://6542c27001b5e279de1f8a8c.mockapi.io/tasklist"
      // );
      // const infos = await dados.json();
      const { data } = await axios.get(url);
      console.log(data);
      setTarefas(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // O useEffect é executado logo após a PRIMEIRA montagem do componente na tela
  // useEffect( () => {}, [])
  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    console.log("SOU UM USEEFFECT!");
  }, []);

  // if (loading) return <h1>CARREGANDO.....</h1>;

  return (
    <main>
      <h1>Lista de Tarefas</h1>
      <section>
        <CreateTask
          novaTarefa={novaTarefa}
          setNovaTarefa={setNovaTarefa}
          cadastrar={cadastrar}
        />
      </section>
      <section>
        <h2>Lista de Tarefas</h2>
        {tarefas.map((item) => (
          <Task key={item.id} item={item} excluirTarefa={excluirTarefa} />
        ))}
      </section>
    </main>
  );
};

export default TaskList;
