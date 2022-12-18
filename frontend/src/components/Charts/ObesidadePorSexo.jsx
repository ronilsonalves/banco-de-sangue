import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import Chart from 'chart.js/auto'

export default function ChartObesidadeSexo() {
  const { data, isLoading, isError } = useQuery('obesidade-sexo', () =>
    API.get('/data/obesidade-sexo')
  )

  useEffect(() => {
    if (data) {
      let labels = data.data.map((item) => item.sexo)
      let datasets = data.data.map((item) => item.percentil)
      const ctx = document.getElementById('obesidade-sexo').getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '% de canidatos obesos por sexo',
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
      <canvas id="obesidade-sexo" width="400" height="400"></canvas>
    </div>
  )
}
