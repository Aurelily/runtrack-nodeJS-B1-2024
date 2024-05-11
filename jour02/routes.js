// routes.js

import { readFile, writeFile } from 'fs';
import { parse } from 'url';
import { resolve } from 'path';

// Fonction pour lire les données à partir de data.json
function readData(callback) {
  readFile(resolve('data.json'), 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    const jsonData = JSON.parse(data);
    callback(null, jsonData);
  });
}

// Fonction pour écrire les données dans data.json
function writeData(data, callback) {
  const jsonData = JSON.stringify(data, null, 2);
  writeFile(resolve('data.json'), jsonData, 'utf8', (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

// Fonction pour récupérer toutes les tâches de la liste
export function getAllTasks(req, res) {
  readData((err, jsonData) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erreur interne du serveur');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonData.tasks));
  });
}

// Fonction pour créer une nouvelle tâche
export function createTask(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newTask = JSON.parse(body);
    readData((err, jsonData) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
        return;
      }
      newTask.id = jsonData.tasks.length + 1;
      jsonData.tasks.push(newTask);
      writeData(jsonData, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erreur interne du serveur');
          return;
        }
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
      });
    });
  });
}

// Fonction pour mettre à jour une tâche existante
export function updateTask(req, res) {
  const taskId = parseInt(parse(req.url, true).pathname.split('/').pop(), 10);
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const updatedTask = JSON.parse(body);
    readData((err, jsonData) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
        return;
      }
      const taskIndex = jsonData.tasks.findIndex(task => task.id === taskId);
      if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Tâche non trouvée');
        return;
      }
      jsonData.tasks[taskIndex] = { ...jsonData.tasks[taskIndex], ...updatedTask };
      writeData(jsonData, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erreur interne du serveur');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonData.tasks[taskIndex]));
      });
    });
  });
}

// Fonction pour supprimer une tâche existante
export function deleteTask(req, res) {
  const taskId = parseInt(parse(req.url, true).pathname.split('/').pop(), 10);
  readData((err, jsonData) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erreur interne du serveur');
      return;
    }
    const taskIndex = jsonData.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Tâche non trouvée');
      return;
    }
    const deletedTask = jsonData.tasks.splice(taskIndex, 1)[0];
    writeData(jsonData, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedTask));
    });
  });
}
