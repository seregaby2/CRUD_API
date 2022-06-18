import cluster from 'cluster'
import { cpus } from 'os'
import { pid } from 'process'

(async () => {
  const arr = [];
  if (cluster.isPrimary) {
    const numOfCpus = cpus().length

    console.log(`Master pid: ${pid}`)
    console.log(`Starting ${numOfCpus} forks`)

    for (let i = 0; i < numOfCpus; i++) cluster.fork()
  } else { 
    arr.push(await import('./server'))
  }
  const id = cluster.worker?.id
  await Promise.all(arr.map(e=> console.log(`Worker's number: ${id}, pid: ${pid}`)))
})()