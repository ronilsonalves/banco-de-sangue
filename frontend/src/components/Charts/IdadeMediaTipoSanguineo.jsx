import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import Chart from 'chart.js/auto'

export default function ChartIdadeMediaTipoSanguineo() {
  const { data, isLoading, isError } = useQuery('idade-media', () =>
    API.get('/data/idade-media')
  )

  useEffect(() => {
    if (data) {
      let labels = data.data.map((item) => item.tipoSanguineo)
      let datasets = data.data.map((item) => item.idadeMedia)
      const ctx = document.getElementById('idade-media-por-tipo-sanguineo').getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Idade média por tipo sanguíneo',
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
      <canvas id="idade-media-por-tipo-sanguineo" width="400" height="400"></canvas>
    </div>
  )
}
