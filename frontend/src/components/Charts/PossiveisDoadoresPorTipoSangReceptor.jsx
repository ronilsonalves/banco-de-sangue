import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import Chart from 'chart.js/auto'

export default function ChartPossiveisDoadoresPorTipoSangReceptor() {
  const { data, isLoading, isError } = useQuery('aptos', () =>
    API.get('/data/aptos')
  )

  useEffect(() => {
    if (data) {
      let labels = data.data.map((item) => item.tipoSanguineoReceptor)
      let datasets = data.data.map((item) => item.count)
      const ctx = document.getElementById('aptos').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Doadores aptos por tipo sanguíneo do receptor',
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
      <canvas id="aptos" width="400" height="400"></canvas>
    </div>
  )
}
