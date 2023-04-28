import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/dist/api'
import { RequestData } from '../../types/request'

export default async function generate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  )

  const { text } = req.body as RequestData

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content: text,
        },
      ],
    })

    const result = response.data.choices[0].message?.content
    res.status(200).json({ result })
  } catch (error) {
    console.error(error)
  }
}
