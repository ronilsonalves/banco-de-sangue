import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { API } from '@/lib/api'
import Chart from 'chart.js/auto'

export default function ChartIMCMedioFaixaEtaria() {
  const { data, isLoading, isError } = useQuery('imc-medio', () =>
    API.get('/data/imc-medio-faixa-etaria')
  )

  useEffect(() => {
    if (data) {
      let labels = data.data.map((item) => item.faixaEtaria)
      let datasets = data.data.map((item) => item.imcMedio)
      const ctx = document.getElementById('imc-medio').getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'IMC Médio por faixa etária',
              data: datasets,
              backgroundColor: '#F87171',
              borderColor: '#F87171',
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
      <canvas id="imc-medio" width="400" height="400"></canvas>
    </div>
  )
}
