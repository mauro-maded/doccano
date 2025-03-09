import { SequenceLabelingApplicationService } from '../sequenceLabelingApplicationService'
import { APISpanRepository } from '@/repositories/tasks/apiSpanRepository'
import { APIRelationRepository } from '@/repositories/tasks/apiRelationRepository'

jest.mock('@/repositories/tasks/apiSpanRepository')
jest.mock('@/repositories/tasks/apiRelationRepository')

describe('SequenceLabelingApplicationService', () => {
  let service
  let mockSpanRepository
  let mockRelationRepository
  
  beforeEach(() => {
    mockSpanRepository = new APISpanRepository()
    mockRelationRepository = new APIRelationRepository()
    service = new SequenceLabelingApplicationService(mockSpanRepository, mockRelationRepository)
  })
  
  describe('findAllTextOccurrences', () => {
    it('finds all occurrences of text in a document', () => {
      const text = 'apple'
      const documentText = 'I like apple pie and apple cider.'
      
      const result = service.findAllTextOccurrences(text, documentText)
      
      expect(result.length).toBe(2)
      expect(result[0]).toEqual([7, 12]) // First "apple"
      expect(result[1]).toEqual([21, 26]) // Second "apple" 
    })
    
    it('returns empty array when no occurrences are found', () => {
      const text = 'banana'
      const documentText = 'I like apple pie.'
      
      const result = service.findAllTextOccurrences(text, documentText)
      
      expect(result.length).toBe(0)
    })
  })
  
  describe('createForAllOccurrences', () => {
    it('creates spans for all occurrences', async () => {
      const projectId = '1'
      const exampleId = 1
      const labelId = 1
      const searchText = 'apple'
      const documentText = 'I like apple pie and apple cider.'
      
      mockSpanRepository.create = jest.fn().mockResolvedValue({})
      
      const result = await service.createForAllOccurrences(
        projectId, exampleId, labelId, searchText, documentText
      )
      
      expect(result).toBe(2)
      expect(mockSpanRepository.create).toHaveBeenCalledTimes(2)
    })
    
    it('skips first occurrence when skipFirst is true', async () => {
      const projectId = '1'
      const exampleId = 1
      const labelId = 1
      const searchText = 'apple'
      const documentText = 'I like apple pie and apple cider.'
      
      mockSpanRepository.create = jest.fn().mockResolvedValue({})
      
      const result = await service.createForAllOccurrences(
        projectId, exampleId, labelId, searchText, documentText, true
      )
      
      expect(result).toBe(1)
      expect(mockSpanRepository.create).toHaveBeenCalledTimes(1)
    })
  })
})