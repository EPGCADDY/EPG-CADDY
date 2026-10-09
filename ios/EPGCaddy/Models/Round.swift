import Foundation

enum TeeColor: String, Codable, CaseIterable, Identifiable {
    case black = "Negro"
    case blue = "Azul"
    case white = "Blanco"
    case red = "Rojo"
    case yellow = "Amarillo"

    var id: String { rawValue }
}

enum HoleResult: String, Codable {
    case eagle = "Eagle"
    case birdie = "Birdie"
    case par = "Par"
    case bogey = "Bogey"
    case doubleBogey = "Double Bogey"
    case tripleBogey = "Triple Bogey"
    case other = "Otro"
}

struct HoleScore: Identifiable, Codable {
    let id: UUID
    let holeNumber: Int
    let par: Int
    let strokeIndex: Int
    let distance: Int?

    var grossScore: Int?
    var handicapStrokes: Int

    init(
        id: UUID = UUID(),
        holeNumber: Int,
        par: Int,
        strokeIndex: Int,
        distance: Int? = nil,
        grossScore: Int? = nil,
        handicapStrokes: Int = 0
    ) {
        self.id = id
        self.holeNumber = holeNumber
        self.par = par
        self.strokeIndex = strokeIndex
        self.distance = distance
        self.grossScore = grossScore
        self.handicapStrokes = handicapStrokes
    }

    var netScore: Int? {
        guard let grossScore else { return nil }
        return grossScore - handicapStrokes
    }

    var grossToPar: Int? {
        guard let grossScore else { return nil }
        return grossScore - par
    }

    var netToPar: Int? {
        guard let netScore else { return nil }
        return netScore - par
    }

    var result: HoleResult? {
        guard let grossToPar else { return nil }

        switch grossToPar {
        case ...(-2):
            return .eagle
        case -1:
            return .birdie
        case 0:
            return .par
        case 1:
            return .bogey
        case 2:
            return .doubleBogey
        case 3:
            return .tripleBogey
        default:
            return .other
        }
    }
}

struct RoundSummary: Codable {
    var eagles: Int = 0
    var birdies: Int = 0
    var pars: Int = 0
    var bogeys: Int = 0
    var doubleBogeys: Int = 0
    var tripleBogeys: Int = 0
    var others: Int = 0
}

struct GolfRound: Identifiable, Codable {
    let id: UUID

    var date: Date
    var playerName: String
    var isDefaultPlayer: Bool
    var playerHandicap: Double

    var courseName: String
    var teeColor: TeeColor
    var courseRating: Double?
    var slopeRating: Int?

    var holes: [HoleScore]

    init(
        id: UUID = UUID(),
        date: Date = Date(),
        playerName: String,
        isDefaultPlayer: Bool = false,
        playerHandicap: Double,
        courseName: String,
        teeColor: TeeColor,
        courseRating: Double? = nil,
        slopeRating: Int? = nil,
        holes: [HoleScore] = []
    ) {
        self.id = id
        self.date = date
        self.playerName = playerName
        self.isDefaultPlayer = isDefaultPlayer
        self.playerHandicap = playerHandicap
        self.courseName = courseName
        self.teeColor = teeColor
        self.courseRating = courseRating
        self.slopeRating = slopeRating
        self.holes = holes
    }

    var completedHoles: [HoleScore] {
        holes.filter { $0.grossScore != nil }
    }

    var grossTotal: Int {
        completedHoles.compactMap(\.grossScore).reduce(0, +)
    }

    var netTotal: Int {
        completedHoles.compactMap(\.netScore).reduce(0, +)
    }

    var playedParTotal: Int {
        completedHoles.reduce(0) { $0 + $1.par }
    }

    var grossToPar: Int {
        grossTotal - playedParTotal
    }

    var netToPar: Int {
        netTotal - playedParTotal
    }

    var isComplete: Bool {
        completedHoles.count == 18
    }

    var summary: RoundSummary {
        var summary = RoundSummary()

        for hole in completedHoles {
            switch hole.result {
            case .eagle:
                summary.eagles += 1
            case .birdie:
                summary.birdies += 1
            case .par:
                summary.pars += 1
            case .bogey:
                summary.bogeys += 1
            case .doubleBogey:
                summary.doubleBogeys += 1
            case .tripleBogey:
                summary.tripleBogeys += 1
            case .other:
                summary.others += 1
            case .none:
                break
            }
        }

        return summary
    }
}
