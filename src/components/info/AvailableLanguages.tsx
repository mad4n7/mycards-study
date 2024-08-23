const languages = [
  'Arabic',
  'Bengali',
  'Bulgarian',
  'Chinese (Simplified / Traditional)',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Farsi',
  'Finnish',
  'French',
  'German',
  'Greek',
  'Gujarati',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Kannada',
  'Korean',
  'Latvian',
  'Lithuanian',
  'Malayalam',
  'Marathi',
  'Norwegian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Serbian',
  'Slovak',
  'Slovenian',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Vietnamese',
]

const AvailableLanguages = () => {
  return (
    <>
      <h4 className="text-slate-300">Available languages:</h4>
      <blockquote className="text-sm leading-6 text-slate-400">
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:flex-wrap">
          <div className="flex-1">{languages.join(', ')}</div>
        </div>
      </blockquote>
    </>
  )
}

export default AvailableLanguages
