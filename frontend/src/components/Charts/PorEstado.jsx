import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import Chart from 'chart.js/auto'

export default function ChartPorEstado() {
  const { data, isLoading, isError } = useQuery('candidatos-por-estado', () =>
    API.get('/data/estados')
  )

  useEffect(() => {
    if (data) {
      let labels = data.data.map((item) => item.estado)
      let datasets = data.data.map((item) => item.count)
      const ctx = document.getElementById('candidatos-por-estado').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Candidatos por estado',
              data: datasets,
              backgroundColor: '#F87171',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }
  }, [data])

  return (
    <div className="w-full">
      <canvas id="candidatos-por-estado" width="400" height="400"></canvas>
    </div>
  )
}
